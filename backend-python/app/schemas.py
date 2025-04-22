from pydantic import BaseModel

class DocumentCreate(BaseModel):
    title: str

class DocumentOut(BaseModel):
    id: int
    title: str
    status: str
    owner_id: int

    class Config:
        orm_mode = True
