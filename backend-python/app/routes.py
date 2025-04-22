from fastapi import APIRouter, Depends, UploadFile, File
from sqlalchemy.orm import Session
from . import crud, schemas
from .db import SessionLocal

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/documents/upload", response_model=schemas.DocumentOut)
async def upload_document(title: str, file: UploadFile = File(...), db: Session = Depends(get_db)):
    # 👉 For now, just receive file, not saving it
    # You can save file content later to storage
    return crud.create_document(db=db, document=schemas.DocumentCreate(title=title), owner_id=1)
