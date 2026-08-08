// backend/data/curriculum.js
// 31-Day Enterprise AI Engineering Cohort Curriculum across 8 Core Modules
// Auto-generated from official curriculum specification

export const CURRICULUM_MODULES = [
  {
    "moduleId": 1,
    "title": "Environment & Tooling",
    "daysRange": "Days 1-3",
    "description": "Comprehensive module covering Environment & Tooling across Days 1 through 3.",
    "days": [
      1,
      2,
      3
    ]
  },
  {
    "moduleId": 2,
    "title": "Data Foundations",
    "daysRange": "Days 4-6",
    "description": "Comprehensive module covering Data Foundations across Days 4 through 6.",
    "days": [
      4,
      5,
      6
    ]
  },
  {
    "moduleId": 3,
    "title": "Embeddings & Vector Search",
    "daysRange": "Days 7-10",
    "description": "Comprehensive module covering Embeddings & Vector Search across Days 7 through 10.",
    "days": [
      7,
      8,
      9,
      10
    ]
  },
  {
    "moduleId": 4,
    "title": "LLM Core, Prompting & Fine-Tuning",
    "daysRange": "Days 11-15",
    "description": "Comprehensive module covering LLM Core, Prompting & Fine-Tuning across Days 11 through 15.",
    "days": [
      11,
      12,
      13,
      14,
      15
    ]
  },
  {
    "moduleId": 5,
    "title": "Chatbot Application Build",
    "daysRange": "Days 16-20",
    "description": "Comprehensive module covering Chatbot Application Build across Days 16 through 20.",
    "days": [
      16,
      17,
      18,
      19,
      20
    ]
  },
  {
    "moduleId": 6,
    "title": "Agentic AI & MCP",
    "daysRange": "Days 21-24",
    "description": "Comprehensive module covering Agentic AI & MCP across Days 21 through 24.",
    "days": [
      21,
      22,
      23,
      24
    ]
  },
  {
    "moduleId": 7,
    "title": "Evaluation, Security & Deployment",
    "daysRange": "Days 25-28",
    "description": "Comprehensive module covering Evaluation, Security & Deployment across Days 25 through 28.",
    "days": [
      25,
      26,
      27,
      28
    ]
  },
  {
    "moduleId": 8,
    "title": "Production & Capstone",
    "daysRange": "Days 29-31",
    "description": "Comprehensive module covering Production & Capstone across Days 29 through 31.",
    "days": [
      29,
      30,
      31
    ]
  }
];

export const CURRICULUM_DAYS = [
  {
    "day": 1,
    "moduleId": 1,
    "moduleTitle": "Environment & Tooling",
    "topic": "VS Code & Python Environment Setup",
    "type": "SETUP",
    "toolsUsed": [
      "VS Code",
      "Python",
      "Python Extension",
      "Pylance",
      "Virtual Environment"
    ],
    "objectives": [
      "Install VS Code and Python on your machine",
      "Configure the Python extension and Pylance",
      "Create and activate a project virtual environment (.venv)",
      "Run and debug your first Python program inside VS Code",
      "Verify the development environment is ready for the remaining course"
    ],
    "keyConcepts": [
      "VS Code & Python Environment Setup",
      "VS Code",
      "Python",
      "Python Extension",
      "Install VS Code and",
      "Configure the Python extension",
      "Create and activate a",
      "Run and debug your",
      "Verify the development environment"
    ],
    "sampleQuestions": [
      "In Day 1 (VS Code & Python Environment Setup), walk me through how you implemented this using VS Code, Python, Python Extension and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 1 (VS Code & Python Environment Setup), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 1 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 2,
    "moduleId": 1,
    "moduleTitle": "Environment & Tooling",
    "topic": "Local LLM & AI Coding Assistant Setup",
    "type": "SETUP",
    "toolsUsed": [
      "Ollama",
      "Qwen2.5-Coder",
      "GitHub Copilot",
      "Cline"
    ],
    "objectives": [
      "Install Ollama and download a local coding model",
      "Verify the local model works through the Ollama CLI",
      "Connect VS Code to the local model using GitHub Copilot or Cline",
      "Generate code using the local AI assistant",
      "Confirm the complete AI coding workflow works offline"
    ],
    "keyConcepts": [
      "Local LLM & AI Coding Assistant Setup",
      "Ollama",
      "Qwen2.5-Coder",
      "GitHub Copilot",
      "Install Ollama and download",
      "Verify the local model",
      "Connect VS Code to",
      "Generate code using the",
      "Confirm the complete AI"
    ],
    "sampleQuestions": [
      "In Day 2 (Local LLM & AI Coding Assistant Setup), walk me through how you implemented this using Ollama, Qwen2.5-Coder, GitHub Copilot and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 2 (Local LLM & AI Coding Assistant Setup), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 2 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 3,
    "moduleId": 1,
    "moduleTitle": "Environment & Tooling",
    "topic": "First AI Project, React Frontend & GitHub",
    "type": "BUILD",
    "toolsUsed": [
      "Python",
      "Ollama",
      "FastAPI",
      "React",
      "Vite",
      "Git",
      "GitHub"
    ],
    "objectives": [
      "Build a command-line chatbot powered by your local Ollama model",
      "Scaffold a FastAPI backend with a health endpoint",
      "Create a React application using Vite",
      "Connect the React frontend with the FastAPI backend",
      "Initialize Git, commit the project, and publish it to GitHub"
    ],
    "keyConcepts": [
      "First AI Project, React Frontend & GitHub",
      "Python",
      "Ollama",
      "FastAPI",
      "Build a command-line chatbot",
      "Scaffold a FastAPI backend",
      "Create a React application",
      "Connect the React frontend",
      "Initialize Git, commit the"
    ],
    "sampleQuestions": [
      "In Day 3 (First AI Project, React Frontend & GitHub), walk me through how you implemented this using Python, Ollama, FastAPI and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 3 (First AI Project, React Frontend & GitHub), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 3 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 4,
    "moduleId": 2,
    "moduleTitle": "Data Foundations",
    "topic": "Reading & Processing Structured Data",
    "type": "BUILD",
    "toolsUsed": [
      "Pandas",
      "SQLite",
      "SQL",
      "SQLAlchemy"
    ],
    "objectives": [
      "Create synthetic healthcare plans and claims datasets",
      "Load and clean structured CSV data using Pandas",
      "Store the processed data in a SQLite database",
      "Write SQL queries to answer common healthcare questions",
      "Document reusable SQL queries for later chatbot integration"
    ],
    "keyConcepts": [
      "Reading & Processing Structured Data",
      "Pandas",
      "SQLite",
      "SQL",
      "Create synthetic healthcare plans",
      "Load and clean structured",
      "Store the processed data",
      "Write SQL queries to",
      "Document reusable SQL queries"
    ],
    "sampleQuestions": [
      "In Day 4 (Reading & Processing Structured Data), walk me through how you implemented this using Pandas, SQLite, SQL and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 4 (Reading & Processing Structured Data), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 4 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 5,
    "moduleId": 2,
    "moduleTitle": "Data Foundations",
    "topic": "Reading & Processing Unstructured Data",
    "type": "BUILD",
    "toolsUsed": [
      "pdfplumber",
      "PyPDF",
      "python-docx",
      "Tesseract OCR",
      "BeautifulSoup",
      "Requests"
    ],
    "objectives": [
      "Extract text from healthcare PDFs and Word documents",
      "Perform OCR on scanned enrollment forms",
      "Scrape useful content from a public healthcare webpage",
      "Clean and normalize extracted text from multiple sources",
      "Store the processed text files for knowledge-base creation"
    ],
    "keyConcepts": [
      "Reading & Processing Unstructured Data",
      "pdfplumber",
      "PyPDF",
      "python-docx",
      "Extract text from healthcare",
      "Perform OCR on scanned",
      "Scrape useful content from",
      "Clean and normalize extracted",
      "Store the processed text"
    ],
    "sampleQuestions": [
      "In Day 5 (Reading & Processing Unstructured Data), walk me through how you implemented this using pdfplumber, PyPDF, python-docx and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 5 (Reading & Processing Unstructured Data), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 5 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 6,
    "moduleId": 2,
    "moduleTitle": "Data Foundations",
    "topic": "Building the Knowledge Base",
    "type": "BUILD",
    "toolsUsed": [
      "LangChain Text Splitters",
      "JSONL",
      "Python"
    ],
    "objectives": [
      "Convert structured and unstructured healthcare data into a unified knowledge base",
      "Split long documents into retrieval-friendly chunks",
      "Attach metadata such as source, plan type, and document section to every chunk",
      "Export all processed records into a knowledge_base.jsonl file",
      "Validate chunk quality before using them for embeddings"
    ],
    "keyConcepts": [
      "Building the Knowledge Base",
      "LangChain Text Splitters",
      "JSONL",
      "Python",
      "Convert structured and unstructured",
      "Split long documents into",
      "Attach metadata such as",
      "Export all processed records",
      "Validate chunk quality before"
    ],
    "sampleQuestions": [
      "In Day 6 (Building the Knowledge Base), walk me through how you implemented this using LangChain Text Splitters, JSONL, Python and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 6 (Building the Knowledge Base), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 6 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 7,
    "moduleId": 3,
    "moduleTitle": "Embeddings & Vector Search",
    "topic": "Embeddings Explained",
    "type": "AI_CORE",
    "toolsUsed": [
      "Sentence Transformers",
      "OpenAI Embeddings",
      "Scikit-learn",
      "Matplotlib"
    ],
    "objectives": [
      "Understand how text is converted into vector embeddings",
      "Generate embeddings for every knowledge base chunk",
      "Store embeddings alongside the original documents",
      "Visualize embedding clusters using PCA",
      "Analyze whether similar healthcare concepts cluster together"
    ],
    "keyConcepts": [
      "Embeddings Explained",
      "Sentence Transformers",
      "OpenAI Embeddings",
      "Scikit-learn",
      "Understand how text is",
      "Generate embeddings for every",
      "Store embeddings alongside the",
      "Visualize embedding clusters using",
      "Analyze whether similar healthcare"
    ],
    "sampleQuestions": [
      "In Day 7 (Embeddings Explained), walk me through how you implemented this using Sentence Transformers, OpenAI Embeddings, Scikit-learn and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 7 (Embeddings Explained), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 7 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 8,
    "moduleId": 3,
    "moduleTitle": "Embeddings & Vector Search",
    "topic": "Vector Databases Overview",
    "type": "BUILD",
    "toolsUsed": [
      "ChromaDB",
      "Pinecone"
    ],
    "objectives": [
      "Learn the role of vector databases in RAG applications",
      "Set up a local Chroma vector database",
      "Create a cloud-based Pinecone index for comparison",
      "Compare local and managed vector database solutions",
      "Select the most suitable database for the chatbot project"
    ],
    "keyConcepts": [
      "Vector Databases Overview",
      "ChromaDB",
      "Pinecone",
      "Learn the role of",
      "Set up a local",
      "Create a cloud-based Pinecone",
      "Compare local and managed",
      "Select the most suitable"
    ],
    "sampleQuestions": [
      "In Day 8 (Vector Databases Overview), walk me through how you implemented this using ChromaDB, Pinecone and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 8 (Vector Databases Overview), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 8 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 9,
    "moduleId": 3,
    "moduleTitle": "Embeddings & Vector Search",
    "topic": "Building & Populating the Vector Database",
    "type": "BUILD",
    "toolsUsed": [
      "ChromaDB",
      "Sentence Transformers"
    ],
    "objectives": [
      "Load knowledge base embeddings into the vector database",
      "Store documents together with metadata for filtering",
      "Verify that every knowledge base chunk has been indexed",
      "Test semantic search with healthcare-related questions",
      "Evaluate retrieval quality and metadata filtering"
    ],
    "keyConcepts": [
      "Building & Populating the Vector Database",
      "ChromaDB",
      "Sentence Transformers",
      "Load knowledge base embeddings",
      "Store documents together with",
      "Verify that every knowledge",
      "Test semantic search with",
      "Evaluate retrieval quality and"
    ],
    "sampleQuestions": [
      "In Day 9 (Building & Populating the Vector Database), walk me through how you implemented this using ChromaDB, Sentence Transformers and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 9 (Building & Populating the Vector Database), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 9 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 10,
    "moduleId": 3,
    "moduleTitle": "Embeddings & Vector Search",
    "topic": "The Retrieval & Matching Engine",
    "type": "SHIP_IT",
    "toolsUsed": [
      "SQLite",
      "ChromaDB",
      "Python"
    ],
    "objectives": [
      "Build a query router that decides between SQL, vector search, or hybrid retrieval",
      "Implement structured data lookup for plans and claims",
      "Implement semantic retrieval from the vector database",
      "Merge and deduplicate results from multiple retrieval sources",
      "Evaluate retrieval accuracy using a diverse set of healthcare questions"
    ],
    "keyConcepts": [
      "The Retrieval & Matching Engine",
      "SQLite",
      "ChromaDB",
      "Python",
      "Build a query router",
      "Implement structured data lookup",
      "Implement semantic retrieval from",
      "Merge and deduplicate results",
      "Evaluate retrieval accuracy using"
    ],
    "sampleQuestions": [
      "In Day 10 (The Retrieval & Matching Engine), walk me through how you implemented this using SQLite, ChromaDB, Python and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 10 (The Retrieval & Matching Engine), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 10 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 11,
    "moduleId": 4,
    "moduleTitle": "LLM Core, Prompting & Fine-Tuning",
    "topic": "RAG End-to-End & LLM API Basics",
    "type": "BUILD",
    "toolsUsed": [
      "OpenAI SDK",
      "Ollama",
      "Groq",
      "Python"
    ],
    "objectives": [
      "Connect the retrieval engine to an LLM to build a complete RAG pipeline",
      "Configure a local or hosted LLM provider using the OpenAI-compatible SDK",
      "Create a grounded prompt that answers only from retrieved context",
      "Generate answers using retrieved knowledge",
      "Evaluate chatbot responses against the retrieval-only baseline"
    ],
    "keyConcepts": [
      "RAG End-to-End & LLM API Basics",
      "OpenAI SDK",
      "Ollama",
      "Groq",
      "Connect the retrieval engine",
      "Configure a local or",
      "Create a grounded prompt",
      "Generate answers using retrieved",
      "Evaluate chatbot responses against"
    ],
    "sampleQuestions": [
      "In Day 11 (RAG End-to-End & LLM API Basics), walk me through how you implemented this using OpenAI SDK, Ollama, Groq and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 11 (RAG End-to-End & LLM API Basics), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 11 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 12,
    "moduleId": 4,
    "moduleTitle": "LLM Core, Prompting & Fine-Tuning",
    "topic": "Prompt Engineering Fundamentals",
    "type": "LEARN",
    "toolsUsed": [
      "LLMs",
      "Prompt Templates"
    ],
    "objectives": [
      "Understand zero-shot, few-shot, and chain-of-thought prompting",
      "Design multiple system prompt variations for the chatbot",
      "Compare prompts based on accuracy, compliance, and tone",
      "Evaluate prompt performance using a fixed question set",
      "Finalize the production-ready system prompt"
    ],
    "keyConcepts": [
      "Prompt Engineering Fundamentals",
      "LLMs",
      "Prompt Templates",
      "Understand zero-shot, few-shot, and",
      "Design multiple system prompt",
      "Compare prompts based on",
      "Evaluate prompt performance using",
      "Finalize the production-ready system"
    ],
    "sampleQuestions": [
      "In Day 12 (Prompt Engineering Fundamentals), walk me through how you implemented this using LLMs, Prompt Templates and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 12 (Prompt Engineering Fundamentals), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 12 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 13,
    "moduleId": 4,
    "moduleTitle": "LLM Core, Prompting & Fine-Tuning",
    "topic": "Advanced Prompting: Function Calling & Structured Outputs",
    "type": "BUILD",
    "toolsUsed": [
      "OpenAI Function Calling",
      "Pydantic",
      "Python"
    ],
    "objectives": [
      "Define tool schemas for healthcare-related chatbot functions",
      "Implement LLM function calling with automatic tool execution",
      "Validate structured outputs using Pydantic models",
      "Log tool calls for debugging and auditing",
      "Test different user queries to verify correct tool selection"
    ],
    "keyConcepts": [
      "Advanced Prompting: Function Calling & Structured Outputs",
      "OpenAI Function Calling",
      "Pydantic",
      "Python",
      "Define tool schemas for",
      "Implement LLM function calling",
      "Validate structured outputs using",
      "Log tool calls for",
      "Test different user queries"
    ],
    "sampleQuestions": [
      "In Day 13 (Advanced Prompting: Function Calling & Structured Outputs), walk me through how you implemented this using OpenAI Function Calling, Pydantic, Python and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 13 (Advanced Prompting: Function Calling & Structured Outputs), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 13 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 14,
    "moduleId": 4,
    "moduleTitle": "LLM Core, Prompting & Fine-Tuning",
    "topic": "Fine-Tuning: Concepts & When to Use It",
    "type": "LEARN",
    "toolsUsed": [
      "JSONL",
      "OpenAI",
      "LoRA",
      "QLoRA"
    ],
    "objectives": [
      "Understand when fine-tuning is more appropriate than prompting or RAG",
      "Identify chatbot issues that fine-tuning can solve",
      "Create a high-quality fine-tuning dataset",
      "Validate and organize the dataset into training and test sets",
      "Prepare the project for model fine-tuning"
    ],
    "keyConcepts": [
      "Fine-Tuning: Concepts & When to Use It",
      "JSONL",
      "OpenAI",
      "LoRA",
      "Understand when fine-tuning is",
      "Identify chatbot issues that",
      "Create a high-quality fine-tuning",
      "Validate and organize the",
      "Prepare the project for"
    ],
    "sampleQuestions": [
      "In Day 14 (Fine-Tuning: Concepts & When to Use It), walk me through how you implemented this using JSONL, OpenAI, LoRA and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 14 (Fine-Tuning: Concepts & When to Use It), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 14 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 15,
    "moduleId": 4,
    "moduleTitle": "LLM Core, Prompting & Fine-Tuning",
    "topic": "Fine-Tuning: Hands-On with LoRA & QLoRA",
    "type": "SHIP_IT",
    "toolsUsed": [
      "PEFT",
      "Transformers",
      "BitsAndBytes",
      "OpenAI Fine-Tuning",
      "LoRA"
    ],
    "objectives": [
      "Train or fine-tune an LLM using LoRA or the OpenAI fine-tuning workflow",
      "Load and evaluate the fine-tuned model",
      "Compare the base model and fine-tuned model on unseen test cases",
      "Measure improvements in tone, consistency, and response quality",
      "Document whether fine-tuning provides measurable benefits for the chatbot"
    ],
    "keyConcepts": [
      "Fine-Tuning: Hands-On with LoRA & QLoRA",
      "PEFT",
      "Transformers",
      "BitsAndBytes",
      "Train or fine-tune an",
      "Load and evaluate the",
      "Compare the base model",
      "Measure improvements in tone,",
      "Document whether fine-tuning provides"
    ],
    "sampleQuestions": [
      "In Day 15 (Fine-Tuning: Hands-On with LoRA & QLoRA), walk me through how you implemented this using PEFT, Transformers, BitsAndBytes and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 15 (Fine-Tuning: Hands-On with LoRA & QLoRA), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 15 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 16,
    "moduleId": 5,
    "moduleTitle": "Chatbot Application Build",
    "topic": "Chatbot Backend & API Integration",
    "type": "BUILD",
    "toolsUsed": [
      "FastAPI",
      "SQLite",
      "Python"
    ],
    "objectives": [
      "Create a /chat API endpoint for the healthcare chatbot",
      "Integrate retrieval, function calling, and LLM response generation",
      "Implement session-based conversation management",
      "Build a conversation history endpoint",
      "Test the complete backend API using Postman or cURL"
    ],
    "keyConcepts": [
      "Chatbot Backend & API Integration",
      "FastAPI",
      "SQLite",
      "Python",
      "Create a /chat API",
      "Integrate retrieval, function calling,",
      "Implement session-based conversation management",
      "Build a conversation history",
      "Test the complete backend"
    ],
    "sampleQuestions": [
      "In Day 16 (Chatbot Backend & API Integration), walk me through how you implemented this using FastAPI, SQLite, Python and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 16 (Chatbot Backend & API Integration), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 16 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 17,
    "moduleId": 5,
    "moduleTitle": "Chatbot Application Build",
    "topic": "Chatbot Frontend Development",
    "type": "BUILD",
    "toolsUsed": [
      "Streamlit",
      "Requests",
      "UUID"
    ],
    "objectives": [
      "Build an interactive chat interface for the chatbot",
      "Connect the frontend to the backend chat API",
      "Maintain conversation history across user interactions",
      "Add a healthcare plan selector and new conversation option",
      "Validate end-to-end communication between frontend and backend"
    ],
    "keyConcepts": [
      "Chatbot Frontend Development",
      "Streamlit",
      "Requests",
      "UUID",
      "Build an interactive chat",
      "Connect the frontend to",
      "Maintain conversation history across",
      "Add a healthcare plan",
      "Validate end-to-end communication between"
    ],
    "sampleQuestions": [
      "In Day 17 (Chatbot Frontend Development), walk me through how you implemented this using Streamlit, Requests, UUID and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 17 (Chatbot Frontend Development), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 17 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 18,
    "moduleId": 5,
    "moduleTitle": "Chatbot Application Build",
    "topic": "Full-Stack Integration & Streaming Responses",
    "type": "BUILD",
    "toolsUsed": [
      "FastAPI",
      "StreamingResponse",
      "Server-Sent Events",
      "Streamlit"
    ],
    "objectives": [
      "Implement real-time streaming responses from the LLM",
      "Display generated tokens incrementally in the chat interface",
      "Add loading indicators for a better user experience",
      "Handle interrupted or failed streaming requests gracefully",
      "Verify smooth end-to-end streaming between backend and frontend"
    ],
    "keyConcepts": [
      "Full-Stack Integration & Streaming Responses",
      "FastAPI",
      "StreamingResponse",
      "Server-Sent Events",
      "Implement real-time streaming responses",
      "Display generated tokens incrementally",
      "Add loading indicators for",
      "Handle interrupted or failed",
      "Verify smooth end-to-end streaming"
    ],
    "sampleQuestions": [
      "In Day 18 (Full-Stack Integration & Streaming Responses), walk me through how you implemented this using FastAPI, StreamingResponse, Server-Sent Events and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 18 (Full-Stack Integration & Streaming Responses), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 18 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 19,
    "moduleId": 5,
    "moduleTitle": "Chatbot Application Build",
    "topic": "Response Formatting & Rich Outputs",
    "type": "BUILD",
    "toolsUsed": [
      "Pydantic",
      "Markdown",
      "Streamlit"
    ],
    "objectives": [
      "Add citations to chatbot responses using retrieved knowledge",
      "Create structured cards for claims and coverage summaries",
      "Render Markdown content with tables, lists, and formatting",
      "Validate structured outputs before displaying them",
      "Improve chatbot readability and response trustworthiness"
    ],
    "keyConcepts": [
      "Response Formatting & Rich Outputs",
      "Pydantic",
      "Markdown",
      "Streamlit",
      "Add citations to chatbot",
      "Create structured cards for",
      "Render Markdown content with",
      "Validate structured outputs before",
      "Improve chatbot readability and"
    ],
    "sampleQuestions": [
      "In Day 19 (Response Formatting & Rich Outputs), walk me through how you implemented this using Pydantic, Markdown, Streamlit and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 19 (Response Formatting & Rich Outputs), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 19 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 20,
    "moduleId": 5,
    "moduleTitle": "Chatbot Application Build",
    "topic": "Conversation Memory & Context Management",
    "type": "SHIP_IT",
    "toolsUsed": [
      "SQLite",
      "FastAPI",
      "LLM",
      "Token Management"
    ],
    "objectives": [
      "Persist conversation history across multiple user sessions",
      "Build context-aware conversations using previous messages",
      "Implement automatic conversation summarization for long chats",
      "Manage token limits while preserving important context",
      "Ensure the chatbot remembers user preferences throughout a conversation"
    ],
    "keyConcepts": [
      "Conversation Memory & Context Management",
      "SQLite",
      "FastAPI",
      "LLM",
      "Persist conversation history across",
      "Build context-aware conversations using",
      "Implement automatic conversation summarization",
      "Manage token limits while",
      "Ensure the chatbot remembers"
    ],
    "sampleQuestions": [
      "In Day 20 (Conversation Memory & Context Management), walk me through how you implemented this using SQLite, FastAPI, LLM and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 20 (Conversation Memory & Context Management), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 20 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 21,
    "moduleId": 6,
    "moduleTitle": "Agentic AI & MCP",
    "topic": "Agentic Frameworks: LangChain Agents & Tool Use",
    "type": "BUILD",
    "toolsUsed": [
      "LangChain",
      "LangChain Agents",
      "ReAct",
      "Python"
    ],
    "objectives": [
      "Convert function-calling workflows into a reasoning agent",
      "Wrap chatbot capabilities as reusable LangChain tools",
      "Build a ReAct agent capable of selecting the correct tool automatically",
      "Analyze reasoning traces to understand agent decision making",
      "Evaluate whether the agent chooses the right tools for healthcare queries"
    ],
    "keyConcepts": [
      "Agentic Frameworks: LangChain Agents & Tool Use",
      "LangChain",
      "LangChain Agents",
      "ReAct",
      "Convert function-calling workflows into",
      "Wrap chatbot capabilities as",
      "Build a ReAct agent",
      "Analyze reasoning traces to",
      "Evaluate whether the agent"
    ],
    "sampleQuestions": [
      "In Day 21 (Agentic Frameworks: LangChain Agents & Tool Use), walk me through how you implemented this using LangChain, LangChain Agents, ReAct and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 21 (Agentic Frameworks: LangChain Agents & Tool Use), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 21 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 22,
    "moduleId": 6,
    "moduleTitle": "Agentic AI & MCP",
    "topic": "Multi-Agent Orchestration",
    "type": "BUILD",
    "toolsUsed": [
      "CrewAI",
      "LangGraph",
      "Python"
    ],
    "objectives": [
      "Create specialized agents for different healthcare domains",
      "Build a router agent that delegates requests to the correct specialist",
      "Implement a complete multi-agent workflow",
      "Compare multi-agent performance with a single-agent architecture",
      "Identify scenarios where multiple agents provide measurable benefits"
    ],
    "keyConcepts": [
      "Multi-Agent Orchestration",
      "CrewAI",
      "LangGraph",
      "Python",
      "Create specialized agents for",
      "Build a router agent",
      "Implement a complete multi-agent",
      "Compare multi-agent performance with",
      "Identify scenarios where multiple"
    ],
    "sampleQuestions": [
      "In Day 22 (Multi-Agent Orchestration), walk me through how you implemented this using CrewAI, LangGraph, Python and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 22 (Multi-Agent Orchestration), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 22 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 23,
    "moduleId": 6,
    "moduleTitle": "Agentic AI & MCP",
    "topic": "Model Context Protocol (MCP)",
    "type": "BUILD",
    "toolsUsed": [
      "MCP Python SDK",
      "Claude Desktop",
      "Cline",
      "Python"
    ],
    "objectives": [
      "Understand the purpose of the Model Context Protocol",
      "Build an MCP server exposing healthcare chatbot tools",
      "Connect the MCP server to an MCP-compatible client",
      "Expose multiple chatbot capabilities through standardized MCP tools",
      "Verify successful tool execution through live MCP interactions"
    ],
    "keyConcepts": [
      "Model Context Protocol (MCP)",
      "MCP Python SDK",
      "Claude Desktop",
      "Cline",
      "Understand the purpose of",
      "Build an MCP server",
      "Connect the MCP server",
      "Expose multiple chatbot capabilities",
      "Verify successful tool execution"
    ],
    "sampleQuestions": [
      "In Day 23 (Model Context Protocol (MCP)), walk me through how you implemented this using MCP Python SDK, Claude Desktop, Cline and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 23 (Model Context Protocol (MCP)), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 23 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 24,
    "moduleId": 6,
    "moduleTitle": "Agentic AI & MCP",
    "topic": "Agentic Chatbot Integration",
    "type": "SHIP_IT",
    "toolsUsed": [
      "LangChain",
      "MCP",
      "FastAPI",
      "Python"
    ],
    "objectives": [
      "Integrate agents, MCP tools, retrieval, and conversation memory",
      "Replace mock tools with live MCP-powered tool calls",
      "Implement retries, timeouts, and graceful error handling",
      "Perform failure testing to validate chatbot reliability",
      "Build a production-style agentic chatbot pipeline"
    ],
    "keyConcepts": [
      "Agentic Chatbot Integration",
      "LangChain",
      "MCP",
      "FastAPI",
      "Integrate agents, MCP tools,",
      "Replace mock tools with",
      "Implement retries, timeouts, and",
      "Perform failure testing to",
      "Build a production-style agentic"
    ],
    "sampleQuestions": [
      "In Day 24 (Agentic Chatbot Integration), walk me through how you implemented this using LangChain, MCP, FastAPI and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 24 (Agentic Chatbot Integration), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 24 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 25,
    "moduleId": 7,
    "moduleTitle": "Evaluation, Security & Deployment",
    "topic": "Chatbot Evaluation & Testing",
    "type": "SHIP_IT",
    "toolsUsed": [
      "Python",
      "Evaluation Dataset",
      "Automated Testing"
    ],
    "objectives": [
      "Create a benchmark dataset covering representative healthcare questions",
      "Evaluate chatbot responses for accuracy, grounding, and consistency",
      "Measure retrieval quality and end-to-end response performance",
      "Identify common failure cases and document improvement areas",
      "Establish baseline metrics before production deployment"
    ],
    "keyConcepts": [
      "Chatbot Evaluation & Testing",
      "Python",
      "Evaluation Dataset",
      "Automated Testing",
      "Create a benchmark dataset",
      "Evaluate chatbot responses for",
      "Measure retrieval quality and",
      "Identify common failure cases",
      "Establish baseline metrics before"
    ],
    "sampleQuestions": [
      "In Day 25 (Chatbot Evaluation & Testing), walk me through how you implemented this using Python, Evaluation Dataset, Automated Testing and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 25 (Chatbot Evaluation & Testing), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 25 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 26,
    "moduleId": 7,
    "moduleTitle": "Evaluation, Security & Deployment",
    "topic": "Performance Optimization & Cost Management",
    "type": "OPTIMIZE",
    "toolsUsed": [
      "tiktoken",
      "Python",
      "FastAPI"
    ],
    "objectives": [
      "Measure token usage across the chatbot pipeline",
      "Optimize retrieval and prompt size to reduce latency and cost",
      "Implement response caching for repeated queries",
      "Benchmark response time before and after optimization",
      "Document performance improvements using measurable metrics"
    ],
    "keyConcepts": [
      "Performance Optimization & Cost Management",
      "tiktoken",
      "Python",
      "FastAPI",
      "Measure token usage across",
      "Optimize retrieval and prompt",
      "Implement response caching for",
      "Benchmark response time before",
      "Document performance improvements using"
    ],
    "sampleQuestions": [
      "In Day 26 (Performance Optimization & Cost Management), walk me through how you implemented this using tiktoken, Python, FastAPI and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 26 (Performance Optimization & Cost Management), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 26 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 27,
    "moduleId": 7,
    "moduleTitle": "Evaluation, Security & Deployment",
    "topic": "Security, Privacy & Guardrails",
    "type": "BUILD",
    "toolsUsed": [
      "FastAPI",
      "Python",
      "Authentication",
      "Input Validation"
    ],
    "objectives": [
      "Secure chatbot APIs against unauthorized access",
      "Validate and sanitize user inputs before processing",
      "Protect sensitive healthcare information throughout the pipeline",
      "Implement prompt-injection and jailbreak safeguards",
      "Test common security scenarios and document mitigation strategies"
    ],
    "keyConcepts": [
      "Security, Privacy & Guardrails",
      "FastAPI",
      "Python",
      "Authentication",
      "Secure chatbot APIs against",
      "Validate and sanitize user",
      "Protect sensitive healthcare information",
      "Implement prompt-injection and jailbreak",
      "Test common security scenarios"
    ],
    "sampleQuestions": [
      "In Day 27 (Security, Privacy & Guardrails), walk me through how you implemented this using FastAPI, Python, Authentication and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 27 (Security, Privacy & Guardrails), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 27 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 28,
    "moduleId": 7,
    "moduleTitle": "Evaluation, Security & Deployment",
    "topic": "Docker & Kubernetes Deployment",
    "type": "SHIP_IT",
    "toolsUsed": [
      "Docker",
      "Kubernetes",
      "FastAPI",
      "React"
    ],
    "objectives": [
      "Containerize the chatbot backend and frontend using Docker",
      "Deploy the application to a Kubernetes cluster",
      "Configure health checks and environment variables",
      "Verify the deployed chatbot functions correctly",
      "Prepare the application for production hosting"
    ],
    "keyConcepts": [
      "Docker & Kubernetes Deployment",
      "Docker",
      "Kubernetes",
      "FastAPI",
      "Containerize the chatbot backend",
      "Deploy the application to",
      "Configure health checks and",
      "Verify the deployed chatbot",
      "Prepare the application for"
    ],
    "sampleQuestions": [
      "In Day 28 (Docker & Kubernetes Deployment), walk me through how you implemented this using Docker, Kubernetes, FastAPI and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 28 (Docker & Kubernetes Deployment), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 28 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 29,
    "moduleId": 8,
    "moduleTitle": "Production & Capstone",
    "topic": "Monitoring, Logging & Observability",
    "type": "BUILD",
    "toolsUsed": [
      "Python Logging",
      "Prometheus",
      "Grafana"
    ],
    "objectives": [
      "Add structured logging throughout the chatbot pipeline",
      "Monitor API performance and chatbot usage",
      "Track failures, latency, and tool execution metrics",
      "Build dashboards for production observability",
      "Use monitoring insights to improve chatbot reliability"
    ],
    "keyConcepts": [
      "Monitoring, Logging & Observability",
      "Python Logging",
      "Prometheus",
      "Grafana",
      "Add structured logging throughout",
      "Monitor API performance and",
      "Track failures, latency, and",
      "Build dashboards for production",
      "Use monitoring insights to"
    ],
    "sampleQuestions": [
      "In Day 29 (Monitoring, Logging & Observability), walk me through how you implemented this using Python Logging, Prometheus, Grafana and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 29 (Monitoring, Logging & Observability), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 29 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 30,
    "moduleId": 8,
    "moduleTitle": "Production & Capstone",
    "topic": "Production Readiness & Final Testing",
    "type": "SHIP_IT",
    "toolsUsed": [
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Python"
    ],
    "objectives": [
      "Perform complete end-to-end testing of the chatbot",
      "Validate retrieval, agent workflows, and frontend integration",
      "Fix production issues discovered during testing",
      "Complete deployment and operational documentation",
      "Prepare the chatbot for real-world production usage"
    ],
    "keyConcepts": [
      "Production Readiness & Final Testing",
      "FastAPI",
      "Docker",
      "Kubernetes",
      "Perform complete end-to-end testing",
      "Validate retrieval, agent workflows,",
      "Fix production issues discovered",
      "Complete deployment and operational",
      "Prepare the chatbot for"
    ],
    "sampleQuestions": [
      "In Day 30 (Production Readiness & Final Testing), walk me through how you implemented this using FastAPI, Docker, Kubernetes and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 30 (Production Readiness & Final Testing), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 30 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  },
  {
    "day": 31,
    "moduleId": 8,
    "moduleTitle": "Production & Capstone",
    "topic": "Capstone Project & Final Demo",
    "type": "CAPSTONE",
    "toolsUsed": [
      "FastAPI",
      "React",
      "LangChain",
      "MCP",
      "Docker",
      "Kubernetes"
    ],
    "objectives": [
      "Demonstrate the complete enterprise healthcare chatbot",
      "Showcase retrieval, RAG, agents, MCP, and conversation memory",
      "Present the deployed application with production architecture",
      "Evaluate the chatbot using real-world scenarios",
      "Publish the final project with source code and documentation"
    ],
    "keyConcepts": [
      "Capstone Project & Final Demo",
      "FastAPI",
      "React",
      "LangChain",
      "Demonstrate the complete enterprise",
      "Showcase retrieval, RAG, agents,",
      "Present the deployed application",
      "Evaluate the chatbot using",
      "Publish the final project"
    ],
    "sampleQuestions": [
      "In Day 31 (Capstone Project & Final Demo), walk me through how you implemented this using FastAPI, React, LangChain and the primary trade-offs you considered.",
      "What were the key challenges and edge cases you encountered during Day 31 (Capstone Project & Final Demo), and how did you resolve them in production?"
    ],
    "followUpProbes": [
      "How do you quantify the latency SLA and memory footprint of this Day 31 architecture under 10,000 concurrent requests?",
      "If a downstream service or network call timed out during this step, how does your system handle fallback and retry logic?"
    ]
  }
];
