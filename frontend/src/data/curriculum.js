// frontend/src/data/curriculum.js
// 31-Day Enterprise AI Engineering Cohort Curriculum for client-side rendering

export const CURRICULUM_MODULES = [
  {
    moduleId: 1,
    title: "Retrieval-Augmented Generation (RAG)",
    daysRange: "Days 1-5",
    color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400",
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    description: "Document chunking heuristics, embedding metric spaces, hybrid retrieval (BM25 + Dense), Parent-Child retrievers, and RAG Triad evaluation.",
    days: [1, 2, 3, 4, 5]
  },
  {
    moduleId: 2,
    title: "Vector Databases & High-Scale Indexing",
    daysRange: "Days 6-9",
    color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    description: "Vector indexing algorithms (HNSW, IVF, PQ), single-stage filtering in Qdrant/Pinecone, distributed sharding, and ColBERT late-interaction search.",
    days: [6, 7, 8, 9]
  },
  {
    moduleId: 3,
    title: "Advanced Prompt Engineering & Structured Outputs",
    daysRange: "Days 10-14",
    color: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    description: "Dynamic exemplar selection, Tree-of-Thought (ToT), strict JSON schema validation (Pydantic/Instructor), instruction hierarchies, and NIAH benchmarks.",
    days: [10, 11, 12, 13, 14]
  },
  {
    moduleId: 4,
    title: "Agentic AI & Autonomous Architectures",
    daysRange: "Days 15-19",
    color: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    description: "ReAct loops, LangGraph multi-agent supervisors, episodic/semantic memory (Mem0), dynamic sandbox tool execution, and reflexion loops.",
    days: [15, 16, 17, 18, 19]
  },
  {
    moduleId: 5,
    title: "Model Context Protocol (MCP)",
    daysRange: "Days 20-23",
    color: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-400",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    description: "Client-Host-Server triad, JSON-RPC 2.0 stdio & SSE transports, MCP Resources & Tools, custom FastMCP servers, and tool poisoning defenses.",
    days: [20, 21, 22, 23]
  },
  {
    moduleId: 6,
    title: "AI Deployment, Serving & Inference Optimization",
    daysRange: "Days 24-27",
    color: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400",
    badgeColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    description: "High-throughput engines (vLLM, PagedAttention), quantization (AWQ/GPTQ/GGUF/FP8), speculative decoding, KV cache offloading, and Kubernetes KEDA.",
    days: [24, 25, 26, 27]
  },
  {
    moduleId: 7,
    title: "Production AI Systems, Guardrails & Observability",
    daysRange: "Days 28-31",
    color: "from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400",
    badgeColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    description: "OpenTelemetry & Langfuse tracing, NeMo & Llama Guard safety rails, semantic caching (GPTCache), rate limiting, and enterprise architecture capstone.",
    days: [28, 29, 30, 31]
  }
];

export const CURRICULUM_DAYS = [
  {
    day: 1,
    moduleId: 1,
    moduleTitle: "Retrieval-Augmented Generation (RAG)",
    topic: "Document Parsing, Chunking Strategies & Tokenization",
    learningObjectives: [
      "Analyze chunk size and overlap trade-offs on retrieval precision vs context fragmentation.",
      "Implement semantic chunking vs recursive character text splitters.",
      "Handle complex document layouts (tables, markdown, multi-column PDFs) with specialized parsers."
    ],
    toolsUsed: ["LangChain", "Unstructured.io", "PyMuPDF", "Tiktoken"],
    keyConcepts: ["RecursiveCharacterTextSplitter", "Semantic Chunking", "Token Overlap", "Sliding Window", "Layout-aware Parsing"]
  },
  {
    day: 2,
    moduleId: 1,
    moduleTitle: "Retrieval-Augmented Generation (RAG)",
    topic: "Embedding Models, Dimensionality & Metric Spaces",
    learningObjectives: [
      "Evaluate dense vs sparse embedding models (OpenAI text-embedding-3, BGE-M3, BM25).",
      "Understand cosine similarity vs dot product vs euclidean distance in normalized vector spaces.",
      "Apply dimensionality reduction and Matryoshka representation learning."
    ],
    toolsUsed: ["SentenceTransformers", "HuggingFace", "FastEmbed", "Scikit-Learn"],
    keyConcepts: ["Matryoshka Embeddings", "Cosine Similarity", "Dense Vectors", "BGE-Large", "L2 Normalization"]
  },
  {
    day: 3,
    moduleId: 1,
    moduleTitle: "Retrieval-Augmented Generation (RAG)",
    topic: "Hybrid Search & Cross-Encoder Reranking",
    learningObjectives: [
      "Combine sparse lexical search (BM25) with dense semantic search using Reciprocal Rank Fusion (RRF).",
      "Deploy cross-encoder reranking models (Cohere Rerank, BGE-Reranker-Large) for top-N precision.",
      "Optimize retrieval latency versus accuracy trade-offs in multi-stage pipelines."
    ],
    toolsUsed: ["BM25Okapi", "Cohere Rerank API", "FlashRank", "CrossEncoder"],
    keyConcepts: ["Reciprocal Rank Fusion (RRF)", "Cross-Encoder vs Bi-Encoder", "Reranking Top-K", "Lexical vs Semantic Signals"]
  },
  {
    day: 4,
    moduleId: 1,
    moduleTitle: "Retrieval-Augmented Generation (RAG)",
    topic: "Advanced RAG Patterns: Multi-Query, Parent Document & Contextual Compression",
    learningObjectives: [
      "Implement Multi-Query expansion and Hypothetical Document Embeddings (HyDE).",
      "Build Parent Document Retrievers to decouple indexing chunk size from generation context size.",
      "Apply Contextual Compression to strip irrelevant tokens prior to generation."
    ],
    toolsUsed: ["LangChain MultiQuery", "HyDE", "ParentDocumentRetriever", "LLMChainExtractor"],
    keyConcepts: ["HyDE (Hypothetical Document Embeddings)", "Parent-Child Chunking", "Contextual Compression", "Query Decomposition"]
  },
  {
    day: 5,
    moduleId: 1,
    moduleTitle: "Retrieval-Augmented Generation (RAG)",
    topic: "RAG Evaluation & The RAG Triad Metrics",
    learningObjectives: [
      "Quantify RAG performance using the RAG Triad: Context Relevance, Groundedness (Faithfulness), and Answer Relevance.",
      "Automate synthetic test dataset generation using Ragas and TruLens.",
      "Diagnose retrieval vs generation failure modes in production pipelines."
    ],
    toolsUsed: ["Ragas", "TruLens", "Giskard", "LangSmith"],
    keyConcepts: ["Faithfulness", "Answer Relevance", "Context Precision", "Context Recall", "Synthetic Test Generation"]
  },
  {
    day: 6,
    moduleId: 2,
    moduleTitle: "Vector Databases & High-Scale Indexing",
    topic: "Vector Indexing Algorithms: HNSW, IVF & Product Quantization",
    learningObjectives: [
      "Compare graph-based (HNSW) vs inverted file (IVF) vs compression-based (PQ) approximate nearest neighbor algorithms.",
      "Tune HNSW hyperparameters: M (max connections), efConstruction (build-time search depth), and efSearch (query-time depth).",
      "Analyze memory consumption and recall-latency curves for vector indexes."
    ],
    toolsUsed: ["FAISS", "Hnswlib", "Annoy", "NumPy"],
    keyConcepts: ["Hierarchical Navigable Small World (HNSW)", "Inverted File Index (IVF)", "Product Quantization (PQ)", "efSearch vs Recall"]
  },
  {
    day: 7,
    moduleId: 2,
    moduleTitle: "Vector Databases & High-Scale Indexing",
    topic: "Vector Database Architecture & Metadata Filtering",
    learningObjectives: [
      "Architect filtered vector searches using Pre-filtering, Post-filtering, and Single-stage Graph traversal.",
      "Deploy and benchmark purpose-built vector DBs (Qdrant, Pinecone, Milvus, Chroma).",
      "Optimize payload schema and payload index storage."
    ],
    toolsUsed: ["Qdrant", "Pinecone", "ChromaDB", "Milvus"],
    keyConcepts: ["Payload Indexing", "Single-Stage Filtered Search", "Pre-filtering vs Post-filtering", "Namespace Partitioning"]
  },
  {
    day: 8,
    moduleId: 2,
    moduleTitle: "Vector Databases & High-Scale Indexing",
    topic: "Scaling, Sharding & Distributed Vector Storage",
    learningObjectives: [
      "Design distributed vector database topologies with partition sharding and consensus replicas.",
      "Calculate memory, disk IOPS, and network throughput requirements for 100M+ vector collections.",
      "Implement memory-mapped vector storage (mmap) and on-disk index offloading."
    ],
    toolsUsed: ["Qdrant Distributed", "Milvus Cluster", "Kubernetes", "Raft Consensus"],
    keyConcepts: ["Vector Sharding", "Replication Factor", "mmap Vector Storage", "Consistent Hashing", "Raft State Machine"]
  },
  {
    day: 9,
    moduleId: 2,
    moduleTitle: "Vector Databases & High-Scale Indexing",
    topic: "Multi-Modal & Token-Level Vector Search (ColBERT)",
    learningObjectives: [
      "Implement late-interaction multi-vector retrieval architectures using ColBERT (MaxSim operator).",
      "Process and embed multi-modal documents (images, diagrams, code) using CLIP and SigLIP.",
      "Benchmark single-vector vs multi-vector storage and query complexity."
    ],
    toolsUsed: ["ColBERT v2", "RAGatouille", "CLIP / OpenCLIP", "PyTorch"],
    keyConcepts: ["ColBERT Late Interaction", "MaxSim Operator", "Multi-Vector Embeddings", "Cross-Modal Alignments"]
  },
  {
    day: 10,
    moduleId: 3,
    moduleTitle: "Advanced Prompt Engineering & Structured Outputs",
    topic: "Few-Shot In-Context Learning & Dynamic Exemplar Retrieval",
    learningObjectives: [
      "Construct dynamic few-shot prompt templates that retrieve semantically similar exemplars at runtime.",
      "Evaluate exemplar diversity and order sensitivity effects on LLM output distribution.",
      "Implement test-time exemplar calibration to reduce model hallucination."
    ],
    toolsUsed: ["LangChain FewShotPromptTemplate", "SemanticSimilarityExampleSelector", "Instructor"],
    keyConcepts: ["Dynamic Exemplar Selection", "Prompt Calibration", "Order Sensitivity", "In-Context Learning"]
  },
  {
    day: 11,
    moduleId: 3,
    moduleTitle: "Advanced Prompt Engineering & Structured Outputs",
    topic: "Chain-of-Thought, Tree-of-Thought & Reasoning Graphs",
    learningObjectives: [
      "Implement Zero-Shot CoT, Few-Shot CoT, and Self-Consistency voting.",
      "Build Tree-of-Thought (ToT) search algorithms with BFS/DFS exploration and state evaluation.",
      "Design structured scratchpads for multi-step algorithmic reasoning."
    ],
    toolsUsed: ["DSPy", "Tree-of-Thought Engine", "LangChain CoT", "JSON Scratchpad"],
    keyConcepts: ["Self-Consistency (Majority Voting)", "Tree-of-Thought (ToT)", "Step-by-Step Scratchpad", "Branching & Pruning"]
  },
  {
    day: 12,
    moduleId: 3,
    moduleTitle: "Advanced Prompt Engineering & Structured Outputs",
    topic: "Structured Output Enforcement & JSON Schema Validation",
    learningObjectives: [
      "Enforce deterministic JSON outputs using Pydantic, Instructor, and OpenAI/Gemini JSON Schema mode.",
      "Understand grammar-constrained decoding (Outlines, Guidance, GBNF grammars) at the logit level.",
      "Build automated retry and error-correction loops for schema validation errors."
    ],
    toolsUsed: ["Instructor", "Pydantic v2", "Outlines", "Jsonformer"],
    keyConcepts: ["Constrained Logit Masking", "Pydantic Field Validation", "JSON Schema Mode", "Auto-healing Retries"]
  },
  {
    day: 13,
    moduleId: 3,
    moduleTitle: "Advanced Prompt Engineering & Structured Outputs",
    topic: "System Prompting, Persona & Instruction Hierarchy",
    learningObjectives: [
      "Architect robust system prompt hierarchies that resist direct and indirect prompt injection.",
      "Implement role-based persona constraints and tool permission boundaries.",
      "Test prompt resilience against adversarial jailbreaks using red-teaming benchmarks."
    ],
    toolsUsed: ["Promptfoo", "Garak LLM Vulnerability Scanner", "Rebuff", "OpenAI Moderation"],
    keyConcepts: ["Instruction Hierarchy", "Indirect Prompt Injection", "Delimiters & Tagging", "System vs User Boundaries"]
  },
  {
    day: 14,
    moduleId: 3,
    moduleTitle: "Advanced Prompt Engineering & Structured Outputs",
    topic: "Context Window Optimization & Needle-in-a-Haystack Benchmarking",
    learningObjectives: [
      "Benchmark effective retrieval capacity across 32K-1M token context windows using Needle-in-a-Haystack tests.",
      "Mitigate the 'Lost in the Middle' phenomenon through strategic context placement.",
      "Implement prompt caching (Anthropic prompt cache, OpenAI cache) to cut input latency and costs by 80%."
    ],
    toolsUsed: ["Needle In A Haystack Benchmark", "Anthropic Prompt Caching", "Tiktoken Optimizer"],
    keyConcepts: ["Lost in the Middle Effect", "Needle In A Haystack (NIAH)", "Prefix Prompt Caching", "Attention Density"]
  },
  {
    day: 15,
    moduleId: 4,
    moduleTitle: "Agentic AI & Autonomous Architectures",
    topic: "Agent Decision Loops & The ReAct Framework",
    learningObjectives: [
      "Implement the ReAct (Reasoning + Acting) decision cycle: Thought -> Action -> Observation -> Reflection.",
      "Handle tool execution errors, malformed arguments, and timeout fallbacks.",
      "Prevent infinite loops and enforce maximum iteration boundaries in autonomous agents."
    ],
    toolsUsed: ["LangChain Agents", "LlamaIndex ReActAgent", "Custom ReAct Loop"],
    keyConcepts: ["ReAct Loop (Thought-Action-Observation)", "Tool Invocation Schema", "Loop Termination Conditions", "Action Scratchpad"]
  },
  {
    day: 16,
    moduleId: 4,
    moduleTitle: "Agentic AI & Autonomous Architectures",
    topic: "Multi-Agent Systems & Swarm Orchestration (LangGraph / AutoGen)",
    learningObjectives: [
      "Architect multi-agent collaboration graphs using state machines and message routing in LangGraph.",
      "Implement Supervisor-Worker and Peer-to-Peer agent communication topologies.",
      "Manage shared global state versus local agent state in concurrent execution."
    ],
    toolsUsed: ["LangGraph", "AutoGen", "CrewAI", "StateGraph"],
    keyConcepts: ["StateGraph & Reducers", "Supervisor-Worker Topology", "Conditional Edges", "Human-in-the-Loop Interrupts"]
  },
  {
    day: 17,
    moduleId: 4,
    moduleTitle: "Agentic AI & Autonomous Architectures",
    topic: "Agent Memory Systems: Short-term, Episodic & Semantic Memory",
    learningObjectives: [
      "Implement three-tier agent memory: Short-term context, Working scratchpad, and Long-term episodic memory.",
      "Integrate vector-based memory stores (Mem0, Zep) with semantic entity extraction.",
      "Build memory consolidation and forgetting algorithms to prune stale knowledge."
    ],
    toolsUsed: ["Mem0", "Zep", "Postgres Vector Memory", "SummaryBufferMemory"],
    keyConcepts: ["Episodic vs Semantic Memory", "Memory Consolidation", "Entity Fact Extraction", "Temporal Decay Scoring"]
  },
  {
    day: 18,
    moduleId: 4,
    moduleTitle: "Agentic AI & Autonomous Architectures",
    topic: "Dynamic Tool Creation, Code Sandboxes & API Synthesis",
    learningObjectives: [
      "Build agents capable of writing, sandboxing, and executing code to solve ad-hoc computational tasks.",
      "Implement secure runtime execution using WebAssembly (Wasm) or Docker containers (E2B, Modal).",
      "Synthesize dynamic REST API client wrappers from OpenAPI specifications."
    ],
    toolsUsed: ["E2B Code Interpreter", "Docker Sandboxing", "Python REPL", "OpenAPI Spec Parser"],
    keyConcepts: ["Code Execution Sandboxing", "Dynamic Tool Synthesis", "AST Security Verification", "E2B Firewalled Sandbox"]
  },
  {
    day: 19,
    moduleId: 4,
    moduleTitle: "Agentic AI & Autonomous Architectures",
    topic: "Error Handling, Self-Correction & Reflexion Loops",
    learningObjectives: [
      "Implement the Reflexion framework: verbal reinforcement learning through self-reflection and episodic memory.",
      "Design backoff strategies, model cascading, and fallback routing for agent execution failures.",
      "Log detailed execution traces for debugging agent trajectory deviations."
    ],
    toolsUsed: ["Reflexion Engine", "LangSmith Tracing", "Tenacity", "FallbackRouter"],
    keyConcepts: ["Reflexion Framework", "Self-Correction Heuristics", "Model Cascading Fallbacks", "Trajectory Evaluation"]
  },
  {
    day: 20,
    moduleId: 5,
    moduleTitle: "Model Context Protocol (MCP)",
    topic: "MCP Core Architecture, Primitives & Transports",
    learningObjectives: [
      "Understand the Model Context Protocol (MCP) Client-Host-Server topology.",
      "Analyze the JSON-RPC 2.0 message protocol and transport mechanisms (stdio vs Server-Sent Events / SSE).",
      "Inspect MCP lifecycle handshake, protocol version negotiation, and capability exchange."
    ],
    toolsUsed: ["MCP TypeScript SDK", "MCP Python SDK", "Claude Desktop Host", "JSON-RPC 2.0 Inspector"],
    keyConcepts: ["Client-Host-Server Architecture", "stdio vs SSE Transports", "JSON-RPC 2.0 Protocol", "Capability Negotiation"]
  },
  {
    day: 21,
    moduleId: 5,
    moduleTitle: "Model Context Protocol (MCP)",
    topic: "MCP Resources, Prompts & Tools Implementation",
    learningObjectives: [
      "Implement the three core MCP primitives: Resources (static/dynamic URI data), Prompts (parameterized templates), and Tools (executable functions).",
      "Define JSON Schema input schemas for MCP tools and handle client-side argument validation.",
      "Expose live database queries and file streams as subscribed MCP Resources with URI schemes."
    ],
    toolsUsed: ["FastMCP", "MCP Python SDK", "Custom SQLite Resource Provider", "Pydantic"],
    keyConcepts: ["Resource URI Schemes (e.g. postgres://, file://)", "Dynamic Prompts", "MCP Tool Definitions", "Resource Subscriptions"]
  },
  {
    day: 22,
    moduleId: 5,
    moduleTitle: "Model Context Protocol (MCP)",
    topic: "Building & Deploying Custom MCP Servers (FastMCP)",
    learningObjectives: [
      "Develop production-ready MCP servers using FastMCP (Python) and TypeScript SDKs.",
      "Implement authentication headers, environment variable isolation, and stdio process management.",
      "Connect enterprise data stores (GitHub, Slack, PostgreSQL, Jira) via custom MCP connectors."
    ],
    toolsUsed: ["FastMCP", "Uvicorn", "Postgres MCP Server", "GitHub MCP Server"],
    keyConcepts: ["FastMCP Server Creation", "Process Sandboxing", "Environment Secrets Isolation", "stdio Piping"]
  },
  {
    day: 23,
    moduleId: 5,
    moduleTitle: "Model Context Protocol (MCP)",
    topic: "Security, Sandboxing & Permission Models in MCP",
    learningObjectives: [
      "Implement user authorization prompts and permission escalation boundaries in MCP hosts.",
      "Mitigate tool-poisoning attacks, malicious resource injection, and server spoofing.",
      "Design capability-based security models for autonomous agent tool invocations."
    ],
    toolsUsed: ["MCP Security Linter", "OAuth2 Token Exchange", "Permission Handler"],
    keyConcepts: ["Human-in-the-Loop Tool Approval", "Tool Poisoning Mitigations", "Capability Sandboxing", "Resource Allow-listing"]
  },
  {
    day: 24,
    moduleId: 6,
    moduleTitle: "AI Deployment, Serving & Inference Optimization",
    topic: "High-Throughput LLM Serving Engines: vLLM & PagedAttention",
    learningObjectives: [
      "Analyze memory bottlenecks in autoregressive inference: KV Cache memory fragmentation and waste.",
      "Understand PagedAttention algorithms and continuous (in-flight) batching in vLLM.",
      "Benchmark tokens-per-second, Time-To-First-Token (TTFT), and Inter-Token-Latency (ITL)."
    ],
    toolsUsed: ["vLLM", "Triton Server", "HuggingFace TGI", "Locust Load Generator"],
    keyConcepts: ["PagedAttention Algorithm", "Continuous / In-flight Batching", "KV Cache Memory Waste", "TTFT vs ITL"]
  },
  {
    day: 25,
    moduleId: 6,
    moduleTitle: "AI Deployment, Serving & Inference Optimization",
    topic: "Quantization & Model Compression: AWQ, GPTQ, GGUF & FP8",
    learningObjectives: [
      "Compare post-training quantization techniques: AWQ (Activation-aware Weight Quantization), GPTQ, GGUF, and native FP8.",
      "Evaluate perplexity loss, memory footprint reduction, and compute speedups on modern GPUs.",
      "Deploy 4-bit and 8-bit quantized models on edge devices vs cloud GPUs."
    ],
    toolsUsed: ["AutoAWQ", "AutoGPTQ", "llama.cpp (GGUF)", "BitsAndBytes"],
    keyConcepts: ["AWQ (Activation-aware Quantization)", "GPTQ Second-order Optimization", "GGUF Quantization Formats", "FP8 GEMM Kernels"]
  },
  {
    day: 26,
    moduleId: 6,
    moduleTitle: "AI Deployment, Serving & Inference Optimization",
    topic: "Speculative Decoding, KV Cache Management & Prefix Caching",
    learningObjectives: [
      "Implement speculative decoding with a small draft model (e.g. 1B) verifying against a target model (e.g. 70B).",
      "Deploy Medusa and Eagle multi-head speculative architectures without separate draft models.",
      "Optimize KV cache offloading to host CPU RAM and NVMe drives."
    ],
    toolsUsed: ["vLLM Speculative Decoding", "Medusa", "FlashAttention-2", "Chunked Prefill"],
    keyConcepts: ["Speculative Decoding Acceptance Rate", "Draft vs Target Model", "Medusa Multi-Head Decoding", "FlashAttention-2 Kernel"]
  },
  {
    day: 27,
    moduleId: 6,
    moduleTitle: "AI Deployment, Serving & Inference Optimization",
    topic: "Containerization, Cloud Orchestration & GPU Autoscaling",
    learningObjectives: [
      "Containerize LLM inference engines with NVIDIA Container Toolkit and CUDA runtime optimizations.",
      "Deploy Kubernetes clusters with KEDA autoscaling based on queue depth and KV cache utilization.",
      "Configure multi-GPU model parallelism: Tensor Parallelism (TP) vs Pipeline Parallelism (PP)."
    ],
    toolsUsed: ["Docker", "Kubernetes", "KEDA", "NVIDIA Triton", "Ray Serve"],
    keyConcepts: ["Tensor Parallelism (TP)", "Pipeline Parallelism (PP)", "NCCL AllReduce Communication", "KEDA Queue Metrics"]
  },
  {
    day: 28,
    moduleId: 7,
    moduleTitle: "Production AI Systems, Guardrails & Observability",
    topic: "Observability, Distributed Tracing & LLM Application Metrics",
    learningObjectives: [
      "Instrument full-stack AI applications with OpenTelemetry and Langfuse / Arize Phoenix.",
      "Trace multi-step agent trajectories, tool invocations, and vector retrieval spans with parent-child correlation IDs.",
      "Track token consumption, cost attribution, latency bottlenecks, and drift over time."
    ],
    toolsUsed: ["Langfuse", "Arize Phoenix", "OpenTelemetry", "Prometheus / Grafana"],
    keyConcepts: ["Span Tracing & Trace IDs", "Cost Attribution & Token Budgets", "Trajectory Replay", "Latency Heatmaps"]
  },
  {
    day: 29,
    moduleId: 7,
    moduleTitle: "Production AI Systems, Guardrails & Observability",
    topic: "Safety Guardrails, Content Moderation & PII Redaction",
    learningObjectives: [
      "Implement multi-layered input/output guardrails using NeMo Guardrails and Llama Guard.",
      "Detect and redact Personally Identifiable Information (PII) using Microsoft Presidio and regex tokenizers.",
      "Enforce topic rails, hallucination checks, and brand safety policies in real time."
    ],
    toolsUsed: ["NeMo Guardrails", "Llama Guard 3", "Microsoft Presidio", "Lakera Guard"],
    keyConcepts: ["Input/Output Guardrails", "Colang Programmable Rails", "PII Redaction & Deanonymization", "Topic Boundary Enforcement"]
  },
  {
    day: 30,
    moduleId: 7,
    moduleTitle: "Production AI Systems, Guardrails & Observability",
    topic: "Semantic Caching, Rate Limiting & Token Budget Management",
    learningObjectives: [
      "Implement semantic vector caching with Redis / GPTCache to achieve 0ms LLM response times for semantically equivalent queries.",
      "Design tiered token bucket rate limiters to prevent API exhaustion and runaway agent spend.",
      "Tune similarity thresholds to balance cache hit rate against semantic drift."
    ],
    toolsUsed: ["GPTCache", "Redis Vector Store", "Upstash Rate Limit", "TokenBucket"],
    keyConcepts: ["Semantic Caching Hit Ratio", "Cosine Similarity Threshold", "Token Bucket Rate Limiting", "Cache Invalidation Policies"]
  },
  {
    day: 31,
    moduleId: 7,
    moduleTitle: "Production AI Systems, Guardrails & Observability",
    topic: "Enterprise AI System Architecture & End-to-End Capstone Defense",
    learningObjectives: [
      "Synthesize all 7 modules into an enterprise-grade, resilient, multi-tenant AI system architecture.",
      "Defend architectural trade-offs: cost vs latency, accuracy vs speed, autonomy vs determinism.",
      "Conduct a comprehensive technical audit of production readiness, SLA guarantees, and disaster recovery."
    ],
    toolsUsed: ["Full Cohort Stack", "C4 Architecture Model", "SLA / SLO Frameworks"],
    keyConcepts: ["Enterprise System Architecture", "SLA / SLO Formulations", "Cost vs Latency Trade-offs", "Disaster Recovery & Fallbacks"]
  }
];
