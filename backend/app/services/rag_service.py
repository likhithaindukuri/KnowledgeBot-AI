import chromadb
from chromadb.config import Settings

from app.config import CHROMA_DIR, CHUNK_OVERLAP, CHUNK_SIZE
from app.services.pdf_service import chunk_pages, extract_pages_from_pdf

_client = None
COLLECTION_NAME = "knowledgebot_documents"


def get_client():
    global _client
    if _client is None:
        _client = chromadb.PersistentClient(
            path=str(CHROMA_DIR),
            settings=Settings(anonymized_telemetry=False),
        )
    return _client


def get_collection():
    return get_client().get_or_create_collection(name=COLLECTION_NAME)


def index_document(org_id: str, document_id: str, filename: str, file_path: str) -> int:
    pages = extract_pages_from_pdf(file_path)
    chunks = chunk_pages(pages, CHUNK_SIZE, CHUNK_OVERLAP)

    if not chunks:
        return 0

    collection = get_collection()
    ids = [f"{document_id}_{index}" for index in range(len(chunks))]
    metadatas = [
        {
            "organization_id": org_id,
            "document_id": document_id,
            "filename": filename,
            "page_number": chunk["page_number"],
            "chunk_index": index,
        }
        for index, chunk in enumerate(chunks)
    ]
    documents = [chunk["text"] for chunk in chunks]

    collection.upsert(ids=ids, documents=documents, metadatas=metadatas)
    return len(chunks)


def delete_document_vectors(org_id: str, document_id: str) -> None:
    collection = get_collection()
    existing = collection.get(
        where={"$and": [{"organization_id": org_id}, {"document_id": document_id}]}
    )

    if existing["ids"]:
        collection.delete(ids=existing["ids"])


def query_documents(org_id: str, question: str, n_results: int = 4) -> dict:
    collection = get_collection()

    org_docs = collection.get(where={"organization_id": org_id})

    if not org_docs["ids"]:
        return {"chunks": [], "sources": [], "confidence": 0.0}

    results = collection.query(
        query_texts=[question],
        n_results=min(n_results, len(org_docs["ids"])),
        where={"organization_id": org_id},
        include=["documents", "metadatas", "distances"],
    )

    documents = results.get("documents", [[]])[0]
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    if not documents:
        return {"chunks": [], "sources": [], "confidence": 0.0}

    sources = []
    seen = set()

    for metadata in metadatas:
        filename = metadata.get("filename", "Unknown")
        page_number = int(metadata.get("page_number", 1))
        key = (filename, page_number)

        if key not in seen:
            seen.add(key)
            sources.append({"filename": filename, "page": page_number})

    confidence = _distance_to_confidence(distances[0] if distances else 1.0)

    return {
        "chunks": documents,
        "sources": sources,
        "confidence": confidence,
    }


def _distance_to_confidence(distance: float) -> float:
    score = max(0.0, 1.0 - (distance / 2.0))
    return round(score * 100, 1)
