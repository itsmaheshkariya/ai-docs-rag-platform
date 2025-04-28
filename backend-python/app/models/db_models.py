from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class File(Base):
    __tablename__ = 'files'
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    upload_time = Column(DateTime(timezone=True), server_default=func.now())

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    file_id = Column(Integer, ForeignKey('files.id'))
    question_text = Column(String, nullable=False)
    asked_at = Column(DateTime(timezone=True), server_default=func.now())

class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True, index=True)
    question_id = Column(Integer, ForeignKey('questions.id'))
    answer_text = Column(String, nullable=False)
    generated_at = Column(DateTime(timezone=True), server_default=func.now())
