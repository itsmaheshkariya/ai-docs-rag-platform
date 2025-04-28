from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from app.core.config import DATABASE_URL
from app.models.db_models import Base  # Import your Base models here

# Create engine
engine = create_async_engine(DATABASE_URL, future=True)

# Create session factory
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Function to create all tables at startup
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
