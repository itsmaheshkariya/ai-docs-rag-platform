from PyPDF2 import PdfReader
import tempfile

class DocumentReader:
    @staticmethod
    def extract_text(file_content) -> str:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp:
            temp.write(file_content)
            temp_path = temp.name

        reader = PdfReader(temp_path)
        return ''.join(page.extract_text() for page in reader.pages)
