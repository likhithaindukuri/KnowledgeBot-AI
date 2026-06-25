import re

from app.config import GROQ_API_KEY
from app.services.rag_service import query_documents

GREETING_PATTERN = re.compile(
    r"^(hi|hello|hey|howdy|good morning|good afternoon|good evening|greetings)"
    r"[\s!.?,]*$",
    re.IGNORECASE,
)

OUT_OF_SCOPE_MESSAGE = (
    "The relevant information is not available in our documents. "
    "Please contact the organization directly for further assistance."
)

MIN_CONFIDENCE = 35.0


def _is_greeting(question: str) -> bool:
    return bool(GREETING_PATTERN.match(question.strip()))


def generate_answer(
    org_id: str,
    question: str,
    *,
    welcome_message: str | None = None,
    org_name: str | None = None,
) -> dict:
    if _is_greeting(question):
        greeting = welcome_message or "Hello! How can I help you today?"
        return {
            "answer": greeting,
            "confidence": 100.0,
            "source": None,
        }

    retrieval = query_documents(org_id, question)
    chunks = retrieval["chunks"]
    sources = retrieval["sources"]
    confidence = retrieval["confidence"]
    primary_source = sources[0] if sources else None

    if not chunks or confidence < MIN_CONFIDENCE:
        return {
            "answer": OUT_OF_SCOPE_MESSAGE,
            "confidence": confidence,
            "source": None,
        }

    context = "\n\n---\n\n".join(chunks)
    answer = (
        _answer_with_groq(question, context, org_name)
        if GROQ_API_KEY
        else _answer_from_context(chunks)
    )

    if _answer_is_out_of_scope(answer):
        return {
            "answer": OUT_OF_SCOPE_MESSAGE,
            "confidence": confidence,
            "source": None,
        }

    return {
        "answer": answer,
        "confidence": confidence,
        "source": primary_source,
    }


def _answer_is_out_of_scope(answer: str) -> bool:
    lowered = answer.lower()
    markers = [
        "not available in the",
        "not in the provided context",
        "not in the context",
        "cannot find",
        "don't have enough information",
        "do not have enough information",
        "no information",
    ]
    return any(marker in lowered for marker in markers)


def _answer_from_context(chunks: list[str]) -> str:
    text = chunks[0].replace("\n", " ").strip()
    text = " ".join(text.split())

    if len(text) > 280:
        return text[:280].rsplit(" ", 1)[0] + "..."

    return text


def _answer_with_groq(question: str, context: str, org_name: str | None) -> str:
    org_label = org_name or "the organization"

    try:
        from groq import Groq

        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        f"You are a helpful assistant for {org_label}. "
                        "Answer ONLY using the provided context from uploaded documents. "
                        "Write clear, natural sentences. "
                        "If the answer is not supported by the context, reply exactly with: "
                        f"\"{OUT_OF_SCOPE_MESSAGE}\" "
                        "Do not mention context, documents, or retrieval."
                    ),
                },
                {
                    "role": "user",
                    "content": f"Context:\n{context}\n\nQuestion: {question}\n\nAnswer:",
                },
            ],
            temperature=0.2,
            max_tokens=300,
        )

        return response.choices[0].message.content.strip()
    except Exception:
        return _answer_from_context(context.split("\n\n---\n\n"))
