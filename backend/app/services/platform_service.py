from app.config import GROQ_API_KEY

PLATFORM_SYSTEM_PROMPT = """You are the Nexus platform assistant.

Nexus is a multi-tenant RAG SaaS platform where organizations (universities, banks, companies)
register, upload PDF documents, customize an embeddable chat widget, and let their website visitors
ask questions answered from those documents with citations (source file, page, confidence score).

Key concepts you should explain clearly when asked:
- RAG (Retrieval-Augmented Generation): retrieve relevant document chunks first, then generate an answer from that context.
- Organization workflow: register → upload PDFs → customize widget → copy embed script → deploy on their site.
- Widget: a JavaScript snippet organizations embed on their website; it uses a secure token, not a guessable slug.
- Analytics: organizations see chat volume, confidence, and recent conversations in their dashboard.
- Platform assistant (you): helps visitors on the Nexus marketing site understand the product.

Answer in friendly, concise paragraphs. If you do not know something specific about Nexus, say so honestly.
Do not invent pricing, legal terms, or features that are not described above."""


def generate_platform_answer(question: str) -> str:
    if not GROQ_API_KEY:
        return (
            "Nexus helps organizations turn PDFs into an embeddable AI chatbot with citations. "
            "Ask me about RAG, setup steps, or the widget."
        )

    try:
        from groq import Groq

        client = Groq(api_key=GROQ_API_KEY)
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": PLATFORM_SYSTEM_PROMPT},
                {"role": "user", "content": question},
            ],
            temperature=0.4,
            max_tokens=400,
        )
        return response.choices[0].message.content.strip()
    except Exception:
        return (
            "I can explain Nexus, RAG, document upload, widget embedding, and analytics. "
            "Please try your question again in a moment."
        )
