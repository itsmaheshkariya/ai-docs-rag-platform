from fastapi import FastAPI
from app.api.v1.endpoints.api_router import api_router
from fastapi.middleware.cors import CORSMiddleware
from app.db.session import init_db  # Import init_db

app = FastAPI(title="Document RAG API", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

# Call init_db at startup
@app.on_event("startup")
async def startup_event():
    await init_db()
