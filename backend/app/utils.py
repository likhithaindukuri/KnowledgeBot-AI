import re
import uuid


def generate_slug(name: str) -> str:
    slug = name.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug).strip("-")
    return slug or "organization"


def unique_slug(base_slug: str, existing_slugs: set[str]) -> str:
    if base_slug not in existing_slugs:
        return base_slug

    suffix = uuid.uuid4().hex[:6]
    candidate = f"{base_slug}-{suffix}"

    while candidate in existing_slugs:
        suffix = uuid.uuid4().hex[:6]
        candidate = f"{base_slug}-{suffix}"

    return candidate
