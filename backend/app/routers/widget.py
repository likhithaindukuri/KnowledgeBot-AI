import shutil
from pathlib import Path

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.config import API_BASE_URL, LOGO_DIR
from app.dependencies import get_current_organization, get_db
from app.models import ChatLog, Document, Organization, WidgetSettings
from app.schemas import (
    AnalyticsResponse,
    DocumentResponse,
    WidgetPublicConfig,
    WidgetSettingsResponse,
    WidgetSettingsUpdate,
)

router = APIRouter(tags=["widget"])

ALLOWED_STYLES = {"chat", "robot", "assistant", "help"}


def _logo_url(widget_token: str, logo_path: str | None) -> str | None:
    if not logo_path:
        return None
    return f"{API_BASE_URL}/widget/logo/token/{widget_token}"


def _settings_response(settings: WidgetSettings, widget_token: str) -> WidgetSettingsResponse:
    return WidgetSettingsResponse(
        title=settings.title,
        welcome_message=settings.welcome_message,
        primary_color=settings.primary_color,
        position=settings.position,
        button_size=settings.button_size,
        widget_style=settings.widget_style or "chat",
        logo_url=_logo_url(widget_token, settings.logo_path),
    )


def _get_or_create_widget_settings(db: Session, organization: Organization) -> WidgetSettings:
    settings = db.query(WidgetSettings).filter(WidgetSettings.organization_id == organization.id).first()

    if not settings:
        settings = WidgetSettings(organization_id=organization.id)
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


def _get_org_by_token(db: Session, widget_token: str) -> Organization | None:
    return (
        db.query(Organization)
        .filter(Organization.widget_token == widget_token)
        .first()
    )


@router.get("/widget/settings", response_model=WidgetSettingsResponse)
def get_widget_settings(
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    settings = _get_or_create_widget_settings(db, organization)
    return _settings_response(settings, organization.widget_token)


@router.put("/widget/settings", response_model=WidgetSettingsResponse)
def update_widget_settings(
    data: WidgetSettingsUpdate,
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    if data.widget_style not in ALLOWED_STYLES:
        raise HTTPException(status_code=400, detail="Invalid widget style")

    settings = _get_or_create_widget_settings(db, organization)

    settings.title = data.title
    settings.welcome_message = data.welcome_message
    settings.primary_color = data.primary_color
    settings.position = data.position
    settings.button_size = data.button_size
    settings.widget_style = data.widget_style

    db.commit()
    db.refresh(settings)

    return _settings_response(settings, organization.widget_token)


@router.post("/widget/logo", response_model=WidgetSettingsResponse)
async def upload_widget_logo(
    file: UploadFile = File(...),
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")

    ext = Path(file.filename).suffix.lower()
    if ext not in {".png", ".jpg", ".jpeg", ".webp", ".svg"}:
        raise HTTPException(status_code=400, detail="Logo must be PNG, JPG, WEBP, or SVG")

    settings = _get_or_create_widget_settings(db, organization)
    org_logo_dir = LOGO_DIR / str(organization.id)
    org_logo_dir.mkdir(parents=True, exist_ok=True)

    logo_path = org_logo_dir / f"logo{ext}"

    with logo_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    settings.logo_path = str(logo_path)
    db.commit()
    db.refresh(settings)

    return _settings_response(settings, organization.widget_token)


@router.get("/widget/logo/token/{widget_token}")
def get_widget_logo_by_token(widget_token: str, db: Session = Depends(get_db)):
    organization = _get_org_by_token(db, widget_token)

    if not organization:
        raise HTTPException(status_code=404, detail="Widget not found")

    settings = _get_or_create_widget_settings(db, organization)

    if not settings.logo_path or not Path(settings.logo_path).exists():
        raise HTTPException(status_code=404, detail="Logo not found")

    return FileResponse(settings.logo_path)


@router.get("/widget/token/{widget_token}/config", response_model=WidgetPublicConfig)
def get_public_widget_config_by_token(widget_token: str, db: Session = Depends(get_db)):
    organization = _get_org_by_token(db, widget_token)

    if not organization:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Widget not found")

    settings = _get_or_create_widget_settings(db, organization)

    return WidgetPublicConfig(
        title=settings.title,
        welcome_message=settings.welcome_message,
        primary_color=settings.primary_color,
        position=settings.position,
        button_size=settings.button_size,
        widget_style=settings.widget_style or "chat",
        logo_url=_logo_url(organization.widget_token, settings.logo_path),
    )


@router.get("/embed/snippet")
def get_embed_snippet(organization: Organization = Depends(get_current_organization)):
    snippet = (
        f"<!-- Nexus Widget -->\n"
        f'<script src="{API_BASE_URL}/widget.js" '
        f'data-token="{organization.widget_token}" defer></script>'
    )

    return {"snippet": snippet}


@router.delete("/widget/logo", response_model=WidgetSettingsResponse)
def delete_widget_logo(
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    settings = _get_or_create_widget_settings(db, organization)

    if settings.logo_path:
        try:
            path = Path(settings.logo_path)
            if path.exists():
                path.unlink()
        except Exception:
            pass

    settings.logo_path = None
    db.commit()
    db.refresh(settings)

    return _settings_response(settings, organization.widget_token)


@router.get("/analytics", response_model=AnalyticsResponse)
def get_analytics(
    organization: Organization = Depends(get_current_organization),
    db: Session = Depends(get_db),
):
    from datetime import datetime

    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)

    documents_count = (
        db.query(func.count(Document.id))
        .filter(Document.organization_id == organization.id)
        .scalar()
    )

    chats_today = (
        db.query(func.count(ChatLog.id))
        .filter(
            ChatLog.organization_id == organization.id,
            ChatLog.created_at >= today_start,
        )
        .scalar()
    )

    avg_confidence = (
        db.query(func.avg(ChatLog.confidence))
        .filter(ChatLog.organization_id == organization.id)
        .scalar()
    )

    recent_documents = (
        db.query(Document)
        .filter(Document.organization_id == organization.id)
        .order_by(Document.created_at.desc())
        .limit(5)
        .all()
    )

    recent_chats = (
        db.query(ChatLog)
        .filter(ChatLog.organization_id == organization.id)
        .order_by(ChatLog.created_at.desc())
        .limit(10)
        .all()
    )

    return AnalyticsResponse(
        documents=documents_count or 0,
        chats_today=chats_today or 0,
        confidence=round(float(avg_confidence or 0), 1),
        recent_documents=[DocumentResponse.model_validate(doc) for doc in recent_documents],
        recent_chats=[
            {
                "question": chat.question,
                "answer": chat.answer,
                "confidence": chat.confidence,
                "source_filename": chat.source_filename,
                "source_page": chat.source_page,
                "created_at": chat.created_at.isoformat(),
            }
            for chat in recent_chats
        ],
    )
