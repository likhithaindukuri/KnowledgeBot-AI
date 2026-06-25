from fastapi import APIRouter

from app.schemas import ChatRequest, PlatformChatResponse
from app.services.platform_service import generate_platform_answer

router = APIRouter(prefix="/platform", tags=["platform"])


@router.post("/chat", response_model=PlatformChatResponse)
def platform_chat(data: ChatRequest):
    answer = generate_platform_answer(data.question)
    return PlatformChatResponse(answer=answer)
