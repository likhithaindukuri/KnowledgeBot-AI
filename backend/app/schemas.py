from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, EmailStr, Field


class OrganizationCreate(BaseModel):

    name: str
    email: EmailStr
    password: str


class OrganizationLogin(BaseModel):

    email: EmailStr
    password: str


class OrganizationResponse(BaseModel):

    id: UUID
    name: str
    slug: str
    widget_token: str
    email: EmailStr

    model_config = {"from_attributes": True}


class AuthResponse(BaseModel):

    access_token: str
    token_type: str = "bearer"
    organization: OrganizationResponse


class DocumentResponse(BaseModel):

    id: UUID
    filename: str
    chunk_count: int
    created_at: datetime

    model_config = {"from_attributes": True}


class WidgetSettingsUpdate(BaseModel):

    title: str = "Chat with us"
    welcome_message: str = "Hello! How can I help you today?"
    primary_color: str = "#000000"
    position: str = "bottom-right"
    button_size: str = "medium"
    widget_style: str = "chat"


class WidgetSettingsResponse(WidgetSettingsUpdate):

    logo_url: str | None = None

    model_config = {"from_attributes": True}


class WidgetPublicConfig(BaseModel):

    title: str
    welcome_message: str
    primary_color: str
    position: str
    button_size: str
    widget_style: str
    logo_url: str | None = None


class ChatRequest(BaseModel):

    question: str = Field(min_length=1, max_length=1000)


class ChatSource(BaseModel):

    filename: str
    page: int


class ChatResponse(BaseModel):

    answer: str
    confidence: float
    source: ChatSource | None = None


class PlatformChatResponse(BaseModel):

    answer: str


class AnalyticsResponse(BaseModel):

    documents: int
    chats_today: int
    confidence: float
    recent_documents: list[DocumentResponse]
    recent_chats: list[dict]
