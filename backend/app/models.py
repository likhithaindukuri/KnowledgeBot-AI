import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class Organization(Base):

    __tablename__ = "organizations"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False, index=True)
    widget_token = Column(String(36), unique=True, nullable=False, index=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    documents = relationship("Document", back_populates="organization", cascade="all, delete-orphan")
    widget_settings = relationship("WidgetSettings", back_populates="organization", uselist=False, cascade="all, delete-orphan")
    chat_logs = relationship("ChatLog", back_populates="organization", cascade="all, delete-orphan")


class Document(Base):

    __tablename__ = "documents"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    chunk_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="documents")


class WidgetSettings(Base):

    __tablename__ = "widget_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), unique=True, nullable=False)
    title = Column(String, default="Chat with us")
    welcome_message = Column(String, default="Hello! How can I help you today?")
    primary_color = Column(String, default="#000000")
    position = Column(String, default="bottom-right")
    button_size = Column(String, default="medium")
    widget_style = Column(String, default="chat")
    logo_path = Column(String, nullable=True)

    organization = relationship("Organization", back_populates="widget_settings")


class ChatLog(Base):

    __tablename__ = "chat_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    organization_id = Column(UUID(as_uuid=True), ForeignKey("organizations.id"), nullable=False, index=True)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    confidence = Column(Float, default=0.0)
    source_filename = Column(String, nullable=True)
    source_page = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    organization = relationship("Organization", back_populates="chat_logs")
