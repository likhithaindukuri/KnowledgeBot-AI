from pypdf import PdfReader


def extract_pages_from_pdf(file_path: str) -> list[dict]:
    reader = PdfReader(file_path)
    pages = []

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text()
        if text and text.strip():
            pages.append({"page_number": page_number, "text": text.strip()})

    return pages


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    if not text.strip():
        return []

    chunks = []
    start = 0
    length = len(text)

    while start < length:
        end = start + chunk_size
        chunk = text[start:end].strip()
        if chunk:
            chunks.append(chunk)
        start += chunk_size - overlap

    return chunks


def chunk_pages(pages: list[dict], chunk_size: int = 500, overlap: int = 50) -> list[dict]:
    chunks = []

    for page in pages:
        for text in chunk_text(page["text"], chunk_size, overlap):
            chunks.append({
                "text": text,
                "page_number": page["page_number"],
            })

    return chunks
