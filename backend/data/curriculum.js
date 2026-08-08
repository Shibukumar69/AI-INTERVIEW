// backend/data/curriculum.js
// 31-Day Enterprise AI Engineering Cohort Curriculum across 7 Core Modules

export const CURRICULUM_MODULES = [
  {
    moduleId: 1,
    title: "Retrieval-Augmented Generation (RAG)",
    daysRange: "Days 1-5",
    description: "Foundations of document parsing, chunking heuristics, embedding representations, hybrid retrieval, and triadic evaluation.",
    days: [1, 2, 3, 4, 5]
  },
  {
    moduleId: 2,
    title: "Vector Databases & High-Scale Indexing",
    daysRange: "Days 6-9",
    description: "Vector indexing algorithms (HNSW, IVF, PQ), database architecture, metadata filtering, sharding, and multi-modal search.",
    days: [6, 7, 8, 9]
  },
  {
    moduleId: 3,
    title: "Advanced Prompt Engineering & Structured Outputs",
    daysRange: "Days 10-14",
    description: "Few-shot exemplar retrieval, reasoning graphs (CoT/ToT), strict JSON schema enforcement (Pydantic/Instructor), guardrails, and context window optimization.",
    days: [10, 11, 12, 13, 14]
  },
  {
    moduleId: 4,
    title: "Agentic AI & Autonomous Architectures",
    daysRange: "Days 15-19",
    description: "Autonomous decision loops (ReAct), multi-agent supervisor graphs (LangGraph/AutoGen), episodic memory (Mem0), dynamic tool synthesis, and reflexion.",
    days: [15, 16, 17, 18, 19]
  },
  {
    moduleId: 5,
    title: "Model Context Protocol (MCP)",
    daysRange: "Days 20-23",
    description: "Open MCP specification, JSON-RPC 2.0 transports (stdio/SSE), resource URIs, prompt templates, tool discovery, custom FastMCP servers, and security sandboxing.",
    days: [20, 21, 22, 23]
  },
  {
    moduleId: 6,
    title: "AI Deployment, Serving & Inference Optimization",
    daysRange: "Days 24-27",
    description: "High-throughput engines (vLLM, PagedAttention), weight/activation quantization (AWQ/GPTQ/GGUF), speculative decoding, KV cache offloading, and cloud orchestration.",
    days: [24, 25, 26, 27]
  },
  {
    moduleId: 7,
    title: "Production AI Systems, Guardrails & Observability",
    daysRange: "Days 28-31",
    description: "OpenTelemetry & Langfuse distributed tracing, safety guardrails (NeMo/Llama Guard), semantic caching (GPTCache), rate limiting, and enterprise architecture review.",
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
    keyConcepts: ["RecursiveCharacterTextSplitter", "Semantic Chunking", "Token Overlap", "Sliding Window", "Layout-aware Parsing"],
    sampleQuestions: [
      "In Day 1, you implemented document chunking strategies. When dealing with dense financial 10-K reports with nested tables, how do you prevent table fragmentation across chunk boundaries?",
      "How does chunk size affect retrieval recall versus LLM reasoning latency, and what metrics determine the optimal chunk overlap percentage?"
    ],
    followUpProbes: [
      "You mentioned fixed-token chunking. What happens to semantic coherence when a sentence is split mid-thought? How would semantic similarity chunking resolve this?",
      "If you increase chunk overlap to 30%, what is the quantitative impact on vector database storage and embedding computation costs?"
    ]
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
    keyConcepts: ["Matryoshka Embeddings", "Cosine Similarity", "Dense Vectors", "BGE-Large", "L2 Normalization"],
    sampleQuestions: [
      "In Day 2, you benchmarked embedding models. Why does cosine similarity become mathematically identical to the inner dot product when vectors are L2 normalized?",
      "What are Matryoshka Representation Embeddings (MRL), and how do they allow you to truncate embedding dimensions from 1536 to 256 with minimal loss in top-k recall?"
    ],
    followUpProbes: [
      "If you deploy an embedding model in production for multilingual search, why might a dense-only model fail on domain-specific acronyms or SKU numbers?",
      "How do you handle the cold-start latency when calculating embeddings for millions of new documents concurrently?"
    ]
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
    keyConcepts: ["Reciprocal Rank Fusion (RRF)", "Cross-Encoder vs Bi-Encoder", "Reranking Top-K", "Lexical vs Semantic Signals"],
    sampleQuestions: [
      "In Day 3, you designed a two-stage hybrid retrieval pipeline. Why is a bi-encoder used for first-stage candidate retrieval (e.g. top 100) while a cross-encoder is reserved for reranking the top 10?",
      "Explain the mathematical formulation of Reciprocal Rank Fusion (RRF) and the role of the constant k (typically 60) in balancing dense and sparse rankings."
    ],
    followUpProbes: [
      "Cross-encoder rerankers introduce 50-100ms of latency per query. In a production SLA requiring sub-200ms P99, how would you optimize or conditionally bypass reranking?",
      "What happens when the sparse search and dense search return completely disjoint result sets? How does RRF score those items?"
    ]
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
    keyConcepts: ["HyDE (Hypothetical Document Embeddings)", "Parent-Child Chunking", "Contextual Compression", "Query Decomposition"],
    sampleQuestions: [
      "In Day 4, you built advanced retrieval patterns. How does the Parent Document Retriever solve the tension between small chunk sizes for accurate embedding matching and large chunks for LLM context synthesis?",
      "Under what query conditions does HyDE (Hypothetical Document Embeddings) significantly outperform standard dense retrieval, and when does it hallucinate failure modes?"
    ],
    followUpProbes: [
      "When using Multi-Query expansion, you generate 4 alternative queries. How do you deduplicate and aggregate the resulting candidate chunks without overwhelming the context window?",
      "Contextual compression uses an LLM to extract relevant sentences. What is the cost-latency trade-off compared to rule-based extractive summarization?"
    ]
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
    keyConcepts: ["Faithfulness", "Answer Relevance", "Context Precision", "Context Recall", "Synthetic Test Generation"],
    sampleQuestions: [
      "In Day 5, you evaluated RAG pipelines using Ragas. How do you isolate whether a hallucinated answer is caused by retrieval failure (low Context Recall) versus generator failure (low Faithfulness)?",
      "Explain the exact calculation of Faithfulness: how are atomic claims extracted from the generated response and verified against the retrieved context?"
    ],
    followUpProbes: [
      "If your evaluation pipeline shows 95% Answer Relevance but only 40% Faithfulness, what dangerous behavior is the system exhibiting?",
      "How do you prevent LLM-as-a-judge bias (e.g. self-enhancement, verbosity bias) when scoring RAG Triad metrics?"
    ]
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
    keyConcepts: ["Hierarchical Navigable Small World (HNSW)", "Inverted File Index (IVF)", "Product Quantization (PQ)", "efSearch vs Recall"],
    sampleQuestions: [
      "In Day 6, you implemented vector indexing algorithms. Walk me through how HNSW utilizes a multi-layer graph hierarchy with exponentially decreasing vertex density to achieve O(log N) search complexity.",
      "How do tuning parameters M (connections per node) and efSearch impact memory footprint, index build time, and query-time recall in high-dimensional vector spaces?"
    ],
    followUpProbes: [
      "If your index runs out of RAM in production, how does combining IVF with Product Quantization (IVF-PQ) reduce vector footprint by 80-95%, and what is the exact trade-off in distance calculation accuracy?",
      "Why does HNSW struggle with dynamic deletions and updates compared to flat or tree-based indexes?"
    ]
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
    keyConcepts: ["Payload Indexing", "Single-Stage Filtered Search", "Pre-filtering vs Post-filtering", "Namespace Partitioning"],
    sampleQuestions: [
      "In Day 7, you explored vector database architectures. Why does naive post-filtering fail catastrophic when a filter selects only 1% of the dataset, and how does Qdrant's single-stage filtered HNSW traversal solve this?",
      "Compare the architectural trade-offs between dedicated vector databases (like Qdrant/Pinecone) and relational extensions (like pgvector in PostgreSQL)."
    ],
    followUpProbes: [
      "In pgvector, when would you choose an HNSW index over an IVFFlat index, and what is the impact of VACUUM operations on graph connectivity?",
      "How do you enforce multi-tenant data isolation and security permissions inside a shared vector collection?"
    ]
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
    keyConcepts: ["Vector Sharding", "Replication Factor", "mmap Vector Storage", "Consistent Hashing", "Raft State Machine"],
    sampleQuestions: [
      "In Day 8, you designed a distributed vector cluster for 50 million 1536-dimensional vectors. What are the memory calculations for keeping raw vectors in RAM vs using on-disk memory-mapped (mmap) indexes?",
      "How does distributed vector query routing work when a top-k=10 query must scatter-gather across 8 shards?"
    ],
    followUpProbes: [
      "If one shard experiences network latency during a scatter-gather query, how do you prevent tail latency amplification across the entire cluster?",
      "What strategy do you use for live re-sharding when a vector collection grows beyond its initial cluster capacity?"
    ]
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
    keyConcepts: ["ColBERT Late Interaction", "MaxSim Operator", "Multi-Vector Embeddings", "Cross-Modal Alignments"],
    sampleQuestions: [
      "In Day 9, you implemented ColBERT late-interaction search. How does the MaxSim operator compute similarity across token representations, and why does this retain more granular token-level context than single-vector pooling?",
      "What are the storage implications of storing a 128-dimensional vector per token versus a single 1536-dimensional vector per document chunk?"
    ],
    followUpProbes: [
      "How does PLAID (Performance-optimized Late Interaction for Asymmetric Information Distribution) reduce ColBERT search latency to sub-10ms?",
      "How would you integrate image diagrams from architectural blueprints into a multi-modal RAG search space?"
    ]
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
    keyConcepts: ["Dynamic Exemplar Selection", "Prompt Calibration", "Order Sensitivity", "In-Context Learning"],
    sampleQuestions: [
      "In Day 10, you built dynamic few-shot prompt selectors. Why does exemplar ordering in the prompt influence LLM output probabilities, and how do you ensure exemplar diversity rather than retrieving 3 near-identical examples?",
      "What are the limitations of in-context learning when task complexity requires 20+ specialized domain rules?"
    ],
    followUpProbes: [
      "If your dynamic example selector retrieves negative or edge-case examples, how should they be annotated to prevent the model from copying the anti-pattern?",
      "How do you measure whether adding 5 few-shot examples improves accuracy enough to justify the 5x increase in prompt input token costs?"
    ]
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
    keyConcepts: ["Self-Consistency (Majority Voting)", "Tree-of-Thought (ToT)", "Step-by-Step Scratchpad", "Branching & Pruning"],
    sampleQuestions: [
      "In Day 11, you implemented Tree-of-Thought (ToT) reasoning. How does ToT combine heuristic state evaluation with search algorithms (BFS/DFS) to explore and backtrack through candidate solution trees?",
      "Explain the concept of Self-Consistency with temperature sampling: why does taking the majority vote across 5 reasoning chains dramatically reduce logical blunders?"
    ],
    followUpProbes: [
      "Self-consistency requires 5-10 parallel generations, multiplying API costs. How can you implement early stopping or confidence thresholds to cut redundant inference?",
      "How do you enforce that the intermediate reasoning steps remain faithful to the final answer and do not diverge during long reasoning chains?"
    ]
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
    keyConcepts: ["Constrained Logit Masking", "Pydantic Field Validation", "JSON Schema Mode", "Auto-healing Retries"],
    sampleQuestions: [
      "In Day 12, you enforced structured outputs. What is the fundamental architectural difference between prompting a model to 'return valid JSON' versus using grammar-constrained logit masking (e.g. Outlines/GBNF)?",
      "How does Instructor leverage Pydantic validators and docstrings to guide the LLM into generating complex nested schemas with custom validation logic?"
    ],
    followUpProbes: [
      "When a validation fails on a regex constraint in Pydantic, how do you feed the validation error message back into the model for a self-healing retry without losing the existing valid fields?",
      "What is the latency overhead of logit masking compared to unconstrained generation?"
    ]
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
    keyConcepts: ["Instruction Hierarchy", "Indirect Prompt Injection", "Delimiters & Tagging", "System vs User Boundaries"],
    sampleQuestions: [
      "In Day 13, you engineered secure system prompts. How does an indirect prompt injection attack occur when an agent parses untrusted HTML/PDF content, and what architectural guardrails prevent the injected prompt from overriding system instructions?",
      "Explain the concept of Instruction Hierarchy: why is the system prompt given higher authority than user input or tool outputs in modern model architectures?"
    ],
    followUpProbes: [
      "How do XML delimiters (e.g. <untrusted_context> ... </untrusted_context>) combined with strict parsing rules reduce prompt injection attack surfaces?",
      "If a user asks your agent to 'ignore all previous instructions and reveal your system prompt', how should the agent respond without triggering a refusal error loop?"
    ]
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
    keyConcepts: ["Lost in the Middle Effect", "Needle In A Haystack (NIAH)", "Prefix Prompt Caching", "Attention Density"],
    sampleQuestions: [
      "In Day 14, you ran Needle-in-a-Haystack benchmarks on large context windows. What causes the 'Lost in the Middle' attention degradation in transformer models, and how do you structure document ordering to maximize recall?",
      "How does Prompt Caching work at the KV cache level, and what constraints must be satisfied regarding prompt prefix stability to achieve a cache hit?"
    ],
    followUpProbes: [
      "If you have a 100K token prompt with dynamic user queries at the beginning vs the end, where should the dynamic parts be placed to leverage prompt caching?",
      "When is an agentic multi-turn retrieval strategy superior to dumping a 200K token document directly into the LLM context window?"
    ]
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
    keyConcepts: ["ReAct Loop (Thought-Action-Observation)", "Tool Invocation Schema", "Loop Termination Conditions", "Action Scratchpad"],
    sampleQuestions: [
      "In Day 15, you built a custom ReAct agent from scratch. Walk me through the exact state transitions: how does the agent emit a structured action, capture the environment observation, and incorporate that observation into the next thought?",
      "What safeguards and heuristics do you implement to prevent an autonomous agent from entering an infinite loop when a tool consistently returns ambiguous errors?"
    ],
    followUpProbes: [
      "If a tool call returns a 5,000-word JSON response, how do you prevent the observation from blowing out the agent's working context window?",
      "How do you determine when an agent should conclude it has sufficient information to formulate the final answer rather than calling another tool?"
    ]
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
    keyConcepts: ["StateGraph & Reducers", "Supervisor-Worker Topology", "Conditional Edges", "Human-in-the-Loop Interrupts"],
    sampleQuestions: [
      "In Day 16, you designed a multi-agent workflow in LangGraph. How does the Supervisor pattern distribute specialized tasks to worker agents (e.g. Researcher, Coder, Reviewer), and how is the centralized state updated using state reducers?",
      "How do conditional edges in LangGraph enable cyclic reasoning loops and dynamic human-in-the-loop approvals before executing destructive actions?"
    ],
    followUpProbes: [
      "What are the latency and cost multipliers when orchestrating a 4-agent swarm compared to a single-agent system? How do you justify this in production?",
      "How do you handle deadlocks or contradictory outputs when two worker agents give conflicting recommendations to the supervisor?"
    ]
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
    keyConcepts: ["Episodic vs Semantic Memory", "Memory Consolidation", "Entity Fact Extraction", "Temporal Decay Scoring"],
    sampleQuestions: [
      "In Day 17, you engineered agent memory systems. How do you distinguish between short-term conversational context, working state memory, and long-term episodic memory, and how is long-term memory indexed for dynamic retrieval?",
      "How does Mem0 automatically extract atomic facts and user preferences from raw conversational turns and update or invalidate conflicting existing memories?"
    ],
    followUpProbes: [
      "If a user says 'Actually, I moved to London last month' after previously stating they lived in New York, how does your memory reconciliation logic resolve this contradiction?",
      "What scoring formula (e.g. recency, importance, semantic similarity) do you use when ranking memories to inject into an agent's prompt?"
    ]
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
    keyConcepts: ["Code Execution Sandboxing", "Dynamic Tool Synthesis", "AST Security Verification", "E2B Firewalled Sandbox"],
    sampleQuestions: [
      "In Day 18, you built a code-interpreter agent. Why is code execution vastly superior to pure LLM token prediction for arithmetic, data analysis, and graph generation, and what security sandboxing (e.g. E2B/gVisor) is mandatory?",
      "How does an agent parse an OpenAPI JSON spec to dynamically generate tool definitions and execute HTTP calls at runtime?"
    ],
    followUpProbes: [
      "How do you prevent malicious code generated by an agent from performing network reconnaissance or accessing environment variables inside the execution sandbox?",
      "When the Python REPL returns a traceback error, how does the agent use AST inspection and error logs to debug its own code in the next turn?"
    ]
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
    keyConcepts: ["Reflexion Framework", "Self-Correction Heuristics", "Model Cascading Fallbacks", "Trajectory Evaluation"],
    sampleQuestions: [
      "In Day 19, you implemented the Reflexion framework. How does an agent record its failure trajectory in episodic memory, generate a verbal self-critique, and use that critique to avoid repeating the mistake in subsequent attempts?",
      "When an agent fails to solve a complex coding task with a lightweight model (e.g. 8B), how does your orchestration automatically cascade to a larger frontier model (e.g. 70B/GPT-4o)?"
    ],
    followUpProbes: [
      "Can an agent's self-reflection hallucinate false critiques that lead it further away from the correct solution? How do you ground reflection in deterministic unit tests?",
      "How many reflexion iterations provide diminishing returns on task completion rates?"
    ]
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
    keyConcepts: ["Client-Host-Server Architecture", "stdio vs SSE Transports", "JSON-RPC 2.0 Protocol", "Capability Negotiation"],
    sampleQuestions: [
      "In Day 20, you explored the Model Context Protocol (MCP) specification. Explain the Client-Host-Server architectural triad and why standardizing tool and resource access via JSON-RPC 2.0 solves the N*M custom connector problem.",
      "Compare the stdio transport versus the SSE (Server-Sent Events) transport in MCP: when is stdio required for local desktop hosts and when is SSE needed for remote distributed servers?"
    ],
    followUpProbes: [
      "Walk me through the initial MCP initialization handshake: what capabilities (resources, prompts, tools, logging) are declared by the client and server during `initialize`?",
      "How does MCP handle streaming responses and notification events without blocking bidirectional JSON-RPC message queues?"
    ]
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
    keyConcepts: ["Resource URI Schemes (e.g. postgres://, file://)", "Dynamic Prompts", "MCP Tool Definitions", "Resource Subscriptions"],
    sampleQuestions: [
      "In Day 21, you built custom MCP primitives. What is the fundamental difference in purpose and execution model between an MCP Resource (read-only context attachment via URI) and an MCP Tool (actionable function execution)?",
      "How do MCP Prompts allow server developers to expose slash-command templates with structured arguments directly inside host applications?"
    ],
    followUpProbes: [
      "How does resource subscription work when an underlying database record changes and the MCP server emits a `notifications/resources/updated` event?",
      "How do you prevent tool schema bloat when an MCP server exposes 50+ tools to an LLM context window?"
    ]
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
    keyConcepts: ["FastMCP Server Creation", "Process Sandboxing", "Environment Secrets Isolation", "stdio Piping"],
    sampleQuestions: [
      "In Day 22, you engineered custom FastMCP servers. How does FastMCP use Python type hints and docstrings to automatically generate the JSON-RPC tool declarations and validation schemas?",
      "When deploying an MCP server as a standalone daemon over SSE, how do you handle authentication tokens and multi-user session state?"
    ],
    followUpProbes: [
      "If an MCP tool connects to a company's internal PostgreSQL database, how do you enforce read-only SQL queries and prevent SQL injection or destructive DROP statements?",
      "How do you package an MCP server inside a Docker container while allowing stdio communication with a host on the host OS?"
    ]
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
    keyConcepts: ["Human-in-the-Loop Tool Approval", "Tool Poisoning Mitigations", "Capability Sandboxing", "Resource Allow-listing"],
    sampleQuestions: [
      "In Day 23, you analyzed security vulnerabilities in MCP ecosystems. What is a 'Tool Poisoning' attack where a compromised MCP server returns misleading schema descriptions to hijack agent execution, and how do you protect against it?",
      "How does the MCP host enforce interactive user authorization before allowing an agent to execute high-risk tools like `execute_shell_command` or `transfer_funds`?"
    ],
    followUpProbes: [
      "How can an MCP client verify the cryptographic identity and code integrity of a third-party MCP server before executing its tools?",
      "What logging and auditing trails are necessary for compliance when enterprise agents interact with multiple MCP servers across corporate networks?"
    ]
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
    keyConcepts: ["PagedAttention Algorithm", "Continuous / In-flight Batching", "KV Cache Memory Waste", "TTFT vs ITL"],
    sampleQuestions: [
      "In Day 24, you deployed vLLM for high-throughput serving. Explain how PagedAttention solves the physical memory fragmentation problem of the KV cache by allocating non-contiguous virtual memory blocks like an OS page table.",
      "How does Continuous (In-flight) Batching achieve 5x-10x throughput improvements over static batching when handling heterogeneous request lengths?"
    ],
    followUpProbes: [
      "What is the mathematical difference between Time To First Token (TTFT) and Inter-Token Latency (ITL), and which serving optimizations improve TTFT versus throughput?",
      "How do you size GPU VRAM allocation between model weights and KV cache memory when configuring vLLM's `gpu-memory-utilization` parameter?"
    ]
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
    keyConcepts: ["AWQ (Activation-aware Quantization)", "GPTQ Second-order Optimization", "GGUF Quantization Formats", "FP8 GEMM Kernels"],
    sampleQuestions: [
      "In Day 25, you benchmarked model quantization methods. Why does AWQ (Activation-aware Weight Quantization) protect the top 1% of salient weights based on activation magnitude, and why does this preserve perplexity better than uniform round-to-nearest quantization?",
      "Compare GGUF (for CPU/Metal edge inference) with AWQ/GPTQ (for CUDA GPU tensor cores): what are their primary use cases and memory transfer bottlenecks?"
    ],
    followUpProbes: [
      "With modern Hopper (H100) and Ada Lovelace architectures featuring native FP8 Tensor Cores, what are the advantages of FP8 over INT4 quantization for production LLM serving?",
      "How does quantization affect numerical stability in long multi-turn reasoning chains?"
    ]
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
    keyConcepts: ["Speculative Decoding Acceptance Rate", "Draft vs Target Model", "Medusa Multi-Head Decoding", "FlashAttention-2 Kernel"],
    sampleQuestions: [
      "In Day 26, you implemented speculative decoding. Walk me through the acceptance/rejection sampling algorithm: how does the target model verify gamma candidate tokens in parallel during a single forward pass?",
      "What factors determine the draft acceptance rate, and why can a poorly matched draft model actually slow down overall generation latency?"
    ],
    followUpProbes: [
      "How does FlashAttention-2 optimize GPU memory bandwidth by fusing softmax and attention computation into SRAM without reading/writing intermediate N*N attention matrices?",
      "What is Chunked Prefill in vLLM, and how does it prevent long prompt prefill requests from starving active decoding streams?"
    ]
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
    keyConcepts: ["Tensor Parallelism (TP)", "Pipeline Parallelism (PP)", "NCCL AllReduce Communication", "KEDA Queue Metrics"],
    sampleQuestions: [
      "In Day 27, you deployed LLMs on Kubernetes. Explain the difference between Tensor Parallelism (TP) and Pipeline Parallelism (PP): why is TP preferred within a single multi-GPU node over NVLink while PP is used across separate nodes over Ethernet?",
      "How do you configure KEDA autoscalers on Kubernetes to scale GPU pods based on active inference queue depth and TTFT latency rather than generic CPU/Memory utilization?"
    ],
    followUpProbes: [
      "What is the inter-GPU communication overhead of NCCL AllReduce during Tensor Parallelism, and what happens to generation speed when running TP=8 across GPUs without NVLink?",
      "How do you implement zero-downtime rolling updates when deploying updated model weights across a distributed GPU cluster?"
    ]
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
    keyConcepts: ["Span Tracing & Trace IDs", "Cost Attribution & Token Budgets", "Trajectory Replay", "Latency Heatmaps"],
    sampleQuestions: [
      "In Day 28, you instrumented full-stack LLM observability. How do distributed trace spans with parent-child hierarchy allow you to pinpoint whether a 4-second latency spike came from vector search, tool execution, or LLM generation?",
      "How do you design a real-time token and dollar cost attribution system per tenant in a multi-tenant SaaS AI platform using OpenTelemetry spans?"
    ],
    followUpProbes: [
      "What privacy considerations and redaction techniques are mandatory before streaming LLM traces containing potential PII or customer data to third-party telemetry backends?",
      "How do you detect semantic drift in user queries over a 30-day production deployment?"
    ]
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
    keyConcepts: ["Input/Output Guardrails", "Colang Programmable Rails", "PII Redaction & Deanonymization", "Topic Boundary Enforcement"],
    sampleQuestions: [
      "In Day 29, you engineered production safety guardrails. Walk me through the multi-stage guardrail pipeline: how does input sanitization (PII redaction, prompt injection check) precede model generation, and how do output rails verify safety and brand alignment before streaming to the client?",
      "How does NeMo Guardrails use Colang state dialog models to steer conversations away from forbidden topics and guide users back into safe domain boundaries?"
    ],
    followUpProbes: [
      "What is the latency penalty of running a secondary classifier (like Llama Guard 3) on every input and output, and how can you parallelize or cache these checks?",
      "If Presidio redacts a phone number to `<PHONE_NUMBER_1>`, how does your pipeline reverse-map the token back for authorized recipients after LLM processing?"
    ]
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
    keyConcepts: ["Semantic Caching Hit Ratio", "Cosine Similarity Threshold", "Token Bucket Rate Limiting", "Cache Invalidation Policies"],
    sampleQuestions: [
      "In Day 30, you built a semantic caching layer with GPTCache and Redis. How does semantic caching differ from standard key-value caching, and how do you calibrate the cosine similarity threshold (e.g. 0.92) to avoid serving stale answers to nuanced queries?",
      "How do you design a token-bucket rate limiter that enforces both a Requests-Per-Minute (RPM) limit and a Tokens-Per-Minute (TPM) limit across distributed worker nodes?"
    ],
    followUpProbes: [
      "How do you handle cache invalidation when the underlying RAG knowledge base is updated with new documents?",
      "What happens when a cached response contains personalized user context (e.g. 'Hello John')? How do you generalize cached entries?"
    ]
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
    keyConcepts: ["Enterprise System Architecture", "SLA / SLO Formulations", "Cost vs Latency Trade-offs", "Disaster Recovery & Fallbacks"],
    sampleQuestions: [
      "In Day 31, you defend your end-to-end Enterprise AI architecture. Walk me through the complete lifecycle of a user request in your production system: from Edge Gateway, Rate Limiting, Semantic Cache, Guardrails, Agent Orchestration, Hybrid RAG Retrieval, Model Inference, to Observability Tracing.",
      "If your primary LLM provider suffers a major outage in the middle of peak trading hours, what automated fallback routing, state preservation, and graceful degradation strategies guarantee business continuity?"
    ],
    followUpProbes: [
      "How do you mathematically justify the Total Cost of Ownership (TCO) of hosting self-managed open-source models on vLLM versus using proprietary frontier APIs at 100 million tokens per day?",
      "What are the top 3 architectural vulnerabilities in your system, and how would you prioritize hardening them in the next engineering cycle?"
    ]
  }
];
