# Document RAG App - Backend Python

## Project Overview

The **Document RAG App - Backend Python** is a backend service designed to process PDF documents and answer user queries using Retrieval-Augmented Generation (RAG). It leverages the Together AI model (`meta-llama/Llama-3.3-70B-Instruct-Turbo-Free`) for generating responses.

### Key Features

- **Document Upload**: Upload PDF files for processing.
- **Question Answering**: Ask questions about the uploaded document and receive AI-generated answers.
- **Lightweight API**: Simple and efficient RESTful API for integration with other services.

---

## Prerequisites

Ensure the following are installed on your system:

- **Python 3.11** or higher
- **pip** (Python package manager)
- **Uvicorn** (for running the FastAPI application)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd document-rag-app/backend-python
```

### 2. Create a Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install --no-cache-dir -r requirements.txt
```

### 4. Configure Environment Variables
- Create a `.env` file in the root directory.
- Add the following variables:
  ```env
  TOGETHER_API_KEY=<your-together-ai-api-key>
  MAX_FILE_SIZE_MB=2
  SUPPORTED_FILE_TYPES=pdf
  ```

### 5. Run the Application
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## API Documentation

### Base URL
`http://localhost:8000`

### Endpoints

#### 1. **Ask a Question**
- **URL**: `/v1/ask-question`
- **Method**: `POST`
- **Description**: Upload a PDF file and ask a question about its content.
- **Request**:
  - **Headers**:
    ```json
    {
      "Content-Type": "multipart/form-data"
    }
    ```
  - **Body**:
    - `file`: PDF file (max size: 2 MB)
    - `question`: Text of the question
- **Response**:
  - **Success** (`200 OK`):
    ```json
    {
      "answer": "Generated answer from the document."
    }
    ```
  - **Error** (`400 Bad Request`):
    ```json
    {
      "error": "Invalid file type or size exceeds limit."
    }
    ```

---

## Folder Structure

```
backend-python/
├── app/
│   ├── main.py          # Entry point for the FastAPI application
│   ├── routes.py        # API route definitions
│   ├── services.py      # Business logic for document processing
│   ├── utils.py         # Utility functions
│   └── models.py        # Data models
├── requirements.txt      # Python dependencies
├── .env.example          # Example environment variables
└── README.md             # Project documentation
```

---

## Deployment

### Using Docker
1. Build the Docker image:
   ```bash
   docker build -t backend-python .
   ```
2. Run the container:
   ```bash
   docker run -p 8000:8000 --env-file .env backend-python
   ```

---

## Limitations

- **File Size**: Maximum file size is **2 MB** (~2000 tokens).
- **File Type**: Only PDF files are supported.
- **Model**: Only Together AI models are used (not OpenAI).

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of changes"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or feedback, please contact [itsmaheshkariya@example.com].
