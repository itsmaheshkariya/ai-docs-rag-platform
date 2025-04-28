from fastapi import APIRouter
from app.api.v1.endpoints import question

api_router = APIRouter()
api_router.include_router(question.router, prefix="/v1", tags=["Question"])
