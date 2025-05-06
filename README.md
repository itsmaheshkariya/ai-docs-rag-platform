# 🧠 Document RAG Application

A multi-backend Retrieval-Augmented Generation (RAG) platform for document Q&A, built with 🐍 Python + 🟩 Node.js + ⚛️ Next.js + 🐳 Docker.

---

## 🔧 Project Setup

### 📦 Prerequisites

- Docker & Docker Compose
- Node.js (v16+)
- Python (v3.11+)

---

## 🚀 Getting Started

Spin up the full stack:

```bash
docker compose up --build
```

---

## 🌐 Application URLs

| Service           | URL                            | Docs URL                             |
|------------------|---------------------------------|--------------------------------------|
| 🧠 Node Backend   | http://localhost:3001           | http://localhost:3001/api-docs/      |
| 🐍 Python Backend | http://localhost:8000           | http://localhost:8000/docs/          |
| 💻 Frontend (UI)  | http://localhost:3000           | -                                    |

---

## 📚 Documentation

### 🔹 [Node Backend README](./backend-node/README.md)

Main features:
- Document ingestion & metadata storage
- Query & retrieval endpoints
- Swagger API at `/api-docs`

### 🔹 [Python Backend README](./backend-python/README.md)

Main features:
- PDF file upload
- Ask questions via TogetherAI (`meta-llama/Llama-3`)
- FastAPI Swagger UI at `/docs`

---

## 🖼️ UI Screenshots

### Node Swagger
![Node Swagger](https://github.com/user-attachments/assets/610aca6a-40ea-4853-9a47-3a43fddd84b3)

### Python Swagger
![Python Swagger](https://github.com/user-attachments/assets/3b524eb9-bf5f-4247-a254-655862258e80)

### App UI - Main Screens

![UI 1](https://github.com/user-attachments/assets/1dc816bc-50ce-4273-b9d8-7557aa4b3305)
![UI 2](https://github.com/user-attachments/assets/6582234e-b5b8-4a5e-936d-5ccbf9cef454)
![UI 3](https://github.com/user-attachments/assets/a93518bb-70dd-433f-8aec-7a8ab28f820d)
![UI 4](https://github.com/user-attachments/assets/d759ce63-7886-4584-add4-87d3ab6c5abf)
![UI 5](https://github.com/user-attachments/assets/3a24866f-bb41-4f74-80d8-e643638cb896)
![UI 6](https://github.com/user-attachments/assets/9f7e1fe9-2f1a-445e-8ecd-5d3c88895d40)

---

## 🧑‍💻 Contributors

- [@mahesh.kariya](mailto:itsmaheshkariya@gmail.com)

---

## 📄 License

MIT © [Cyberion Nova]
