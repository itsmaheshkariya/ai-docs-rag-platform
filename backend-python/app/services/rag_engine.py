from app.services.document_reader import DocumentReader
from app.services.llm_client import LLMClient
from app.utils.file_utils import is_file_too_large
from app.core.exceptions import FileTooLargeException
from app.db.session import async_session
from app.models.db_models import File, Question, Answer

class RAGEngine:
    @staticmethod
    async def get_answer(file, question: str):
        file_content = await file.read()

        if is_file_too_large(len(file_content)):
            raise FileTooLargeException()

        document_text = DocumentReader.extract_text(file_content)
        answer_text = LLMClient.ask(document_text, question)

        # Save into DB
        async with async_session() as session:
            db_file = File(filename=file.filename)
            session.add(db_file)
            await session.commit()
            await session.refresh(db_file)

            db_question = Question(file_id=db_file.id, question_text=question)
            session.add(db_question)
            await session.commit()
            await session.refresh(db_question)

            db_answer = Answer(question_id=db_question.id, answer_text=answer_text)
            session.add(db_answer)
            await session.commit()

        return answer_text
