from fastapi import FastAPI
from .db import Base, engine
from .routes import router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(router, prefix="/api", tags=["Documents"])

@app.get("/")
def root():
    return {"message": "🔥 FastAPI Backend Running"}
