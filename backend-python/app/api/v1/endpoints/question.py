from fastapi import APIRouter, UploadFile, Form
from app.services.rag_engine import RAGEngine
from app.models.response import AnswerResponse

router = APIRouter()

@router.post("/ask-question", response_model=AnswerResponse)
async def ask_question(file: UploadFile, question: str = Form(...)):
    answer = await RAGEngine.get_answer(file, question)
    return AnswerResponse(answer=answer)
