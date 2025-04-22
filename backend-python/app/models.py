from sqlalchemy import Column, Integer, String
from .db import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    status = Column(String, default="PROCESSING")
    owner_id = Column(Integer, nullable=False)
