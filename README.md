# 🧠 AETHER COHORT // Autonomous Technical Interview Agent

> **Enterprise AI Cohort Technical Interview Platform & Multi-Turn Evaluation Engine**  
> Grounded in the 31-Day Enterprise AI Engineering Cohort curriculum (RAG, Vector Databases, Prompt Engineering, Agentic AI, Model Context Protocol, Deployment & Production Systems).

---

## ✨ System Highlights

* **🎓 31-Day Enterprise AI Cohort Curriculum**: Full structured mapping of 7 core modules, daily learning objectives, tools used, and technical trade-offs.
* **👤 Candidate Learning Signals & Profiles**: Real-time evaluation informed by completed missions, attempts history, and skipped topic vulnerabilities.
* **🔄 Adaptive Multi-Turn Interview Agent**:
  - Dynamically decides between probing technical trade-offs (`isFollowUp: true`) vs transitioning curriculum topics.
  - Strict enforcement: **Minimum 8 questions** covering **at least 4 distinct curriculum days**.
  - Maintains full conversation context and reasoning memory across turns.
* **📊 Comprehensive Diagnostic Feedback**:
  - Enterprise Readiness Grade (e.g. `L5 Senior AI Systems Engineer`).
  - 7-Module Mastery Radar Chart via Chart.js.
  - Verified Strengths & Critical Knowledge Gaps audit.
  - Actionable 4-week Cohort Graduate Study Roadmap.
* **⚡ Multi-Provider AI Architecture**:
  - **Built-in Intelligent Enterprise AI Engine** *(Default)*: High-depth heuristic NLP engine tuned on all 31 days with **zero API keys or configuration needed**.
  - **Google Gemini API** (`GEMINI_API_KEY`): Gemini 1.5/2.0 Flash integration.
  - **OpenAI API** (`OPENAI_API_KEY`): GPT-4o / GPT-4o-mini integration.
  - **Groq Cloud** (`GROQ_API_KEY`): Llama-3.1 70B ultra-fast inference.
  - **Ollama Local** (`OLLAMA_MODEL_NAME`, `OLLAMA_BASE_URL`): Local offline LLM models.
* **💻 Interactive Monaco Code Sandbox & Audio**: Multi-language code editor (Python, TypeScript, JavaScript, SQL, Bash) + voice transcription.
* **📡 Technical Specification REST API**: Fully compliant HTTP contract for automated benchmarking and external evaluation suites.

---

## 🏛️ The 7 Core Cohort Modules

| Module | Curriculum Days | Topics Covered | Key Technologies |
| :--- | :--- | :--- | :--- |
| **1. RAG & Document Pipelines** | Days 1–5 | Chunking, Embeddings, Hybrid Search (BM25 + Dense), RRF, Parent Document, RAG Triad (Ragas) | LangChain, Unstructured.io, Cohere Rerank, Ragas |
| **2. Vector Databases & High-Scale Indexing** | Days 6–9 | HNSW/IVF Algorithms, Filtered Traversal, Distributed Sharding, ColBERT Late-Interaction | Qdrant, Pinecone, FAISS, ColBERT v2 |
| **3. Advanced Prompting & Structured Outputs** | Days 10–14 | Dynamic Exemplars, Tree-of-Thought (ToT), JSON Schema Enforcement, Guardrails, NIAH Benchmarks | Pydantic v2, Instructor, Outlines, Promptfoo |
| **4. Agentic AI & Autonomous Architectures** | Days 15–19 | ReAct Loops, Multi-Agent Supervisors, Episodic Memory (Mem0), Sandboxed Tools, Reflexion | LangGraph, AutoGen, E2B Sandbox, Mem0 |
| **5. Model Context Protocol (MCP)** | Days 20–23 | Client-Host-Server Triad, stdio & SSE Transports, MCP Resources/Tools, FastMCP, Security | FastMCP, Claude Desktop, JSON-RPC 2.0 |
| **6. AI Deployment & Serving Optimization** | Days 24–27 | vLLM PagedAttention, AWQ/FP8 Quantization, Speculative Decoding, KV Cache, Kubernetes KEDA | vLLM, TensorRT-LLM, AutoAWQ, KEDA |
| **7. Production AI Systems & Observability** | Days 28–31 | OpenTelemetry Tracing, NeMo Guardrails, Presidio PII Redaction, Semantic Caching, Rate Limiting | Langfuse, Arize Phoenix, NeMo, GPTCache |

---

## 📡 Technical Specification REST Endpoints

All endpoints are accessible under `http://localhost:5000/api/`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/curriculum` | Returns complete 31-day curriculum JSON with 7 modules. |
| `GET` | `/api/curriculum/:day` | Returns specific day details, learning objectives, and sample probes. |
| `GET` | `/api/candidates` | Returns all synthetic candidate profiles with learning signals. |
| `GET` | `/api/candidates/:id` | Returns single candidate profile by ID. |
| `POST` | `/api/interview/start` | Initializes a personalized interview session. |
| `POST` | `/api/interview/chat` | Multi-turn conversational answer turn; generates intelligent follow-ups. |
| `POST` | `/api/interview/evaluate`| Concludes interview and generates structured diagnostic report. |
| `GET` | `/api/interview/:sessionId` | Returns active session state and conversation history. |
| `GET` | `/api/interview/:sessionId/report` | Returns final structured evaluation report. |
| `POST` | `/api/agent/interview` | All-in-one Technical Specification benchmark / evaluation test runner. |
| `GET` | `/api/config/status` | Current AI provider and key status. |
| `POST` | `/api/config/update` | Dynamically update AI provider and API keys from client. |

---

## 🚀 Quick Start Guide

### 1. One-Click Launch (Windows)
Double-click `start-all.bat` or run:
```bash
start-all.bat
```

### 2. Manual Start

#### Backend
```bash
cd backend
npm install
node server.js
# Backend runs on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🧪 Interactive API Playground

Navigate to `/api-spec` in the web application to interactively test and execute all Technical Specification endpoints directly in your browser with real-time JSON payload inspection.