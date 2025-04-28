from together import Together
from app.core.config import TOGETHER_API_KEY, TOGETHER_MODEL
from app.utils.text_utils import clean_text

client = Together(api_key=TOGETHER_API_KEY)

class LLMClient:
    @staticmethod
    def ask(document_text: str, question: str) -> str:
        prompt = f"Document:\n{clean_text(document_text)}\n\nQuestion:\n{question}\nAnswer:"
        response = client.chat.completions.create(
            model=TOGETHER_MODEL,
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content.strip()
