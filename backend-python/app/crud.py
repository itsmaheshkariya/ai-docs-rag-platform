from sqlalchemy.orm import Session
from . import models, schemas

def create_document(db: Session, document: schemas.DocumentCreate, owner_id: int):
    db_doc = models.Document(title=document.title, owner_id=owner_id)
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

def get_documents(db: Session, owner_id: int):
    return db.query(models.Document).filter(models.Document.owner_id == owner_id).all()
