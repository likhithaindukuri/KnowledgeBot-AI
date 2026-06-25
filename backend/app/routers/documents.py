import shutil
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.config import UPLOAD_DIR
from app.dependencies import get_current_organization, get_db
from app.models import Document, Organization
from app.schemas import DocumentResponse
from app.services.rag_service import delete_document_vectors, index_document

router = APIRouter(prefix="/documents", tags=["documents"])


@router.get("", response_model=list[DocumentResponse])
def list_documents(
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    documents = (
        db.query(Document)
        .filter(Document.organization_id == organization.id)
        .order_by(Document.created_at.desc())
        .all()
    )
    return documents


@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF files are allowed")

    document_id = uuid.uuid4()
    org_dir = UPLOAD_DIR / str(organization.id)
    org_dir.mkdir(parents=True, exist_ok=True)

    safe_name = Path(file.filename).name
    file_path = org_dir / f"{document_id}_{safe_name}"

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    chunk_count = index_document(
        org_id=str(organization.id),
        document_id=str(document_id),
        filename=safe_name,
        file_path=str(file_path),
    )

    document = Document(
        id=document_id,
        organization_id=organization.id,
        filename=safe_name,
        file_path=str(file_path),
        chunk_count=chunk_count,
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return document


@router.delete("/{document_id}")
def delete_document(
    document_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    document = (
        db.query(Document)
        .filter(Document.id == document_id, Document.organization_id == organization.id)
        .first()
    )

    if not document:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Document not found")

    delete_document_vectors(str(organization.id), str(document.id))

    file_path = Path(document.file_path)
    if file_path.exists():
        file_path.unlink()

    db.delete(document)
    db.commit()

    return {"message": "Document deleted"}
