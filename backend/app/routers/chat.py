from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.models import ChatLog, Organization, WidgetSettings
from app.schemas import ChatRequest, ChatResponse, ChatSource
from app.services.chat_service import generate_answer

router = APIRouter(prefix="/chat", tags=["chat"])


def _get_org_by_token(db: Session, widget_token: str) -> Organization | None:
    return (
        db.query(Organization)
        .filter(Organization.widget_token == widget_token)
        .first()
    )


def _get_welcome_message(db: Session, organization: Organization) -> str | None:
    settings = (
        db.query(WidgetSettings)
        .filter(WidgetSettings.organization_id == organization.id)
        .first()
    )
    return settings.welcome_message if settings else None


def _handle_chat(
    organization: Organization,
    question: str,
    db: Session,
) -> ChatResponse:
    result = generate_answer(
        str(organization.id),
        question,
        welcome_message=_get_welcome_message(db, organization),
        org_name=organization.name,
    )
    source = result.get("source")

    chat_log = ChatLog(
        organization_id=organization.id,
        question=question,
        answer=result["answer"],
        confidence=result["confidence"],
        source_filename=source["filename"] if source else None,
        source_page=source["page"] if source else None,
    )

    db.add(chat_log)
    db.commit()

    return ChatResponse(
        answer=result["answer"],
        confidence=result["confidence"],
        source=ChatSource(**source) if source else None,
    )


@router.post("/token/{widget_token}", response_model=ChatResponse)
def ask_by_token(widget_token: str, data: ChatRequest, db: Session = Depends(get_db)):
    organization = _get_org_by_token(db, widget_token)

    if not organization:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Widget not found",
        )

    return _handle_chat(organization, data.question, db)
