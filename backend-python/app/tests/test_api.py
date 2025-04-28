from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_ask_question_no_file():
    response = client.post("/v1/ask-question", data={"question": "What is this about?"})
    assert response.status_code == 422
