// frontend/src/data/candidates.js
// Synthetic Candidate Profiles for client-side rendering

export const CANDIDATE_PROFILES = [
  {
    id: "candidate-1",
    name: "Alex Chen",
    email: "alex.chen@enterprise-ai.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    cohortTrack: "Senior AI Systems Engineer",
    experienceLevel: "Senior (5+ yrs)",
    targetRole: "Lead LLM Infrastructure & RAG Architect",
    summary: "Strong technical depth in RAG architectures and high-dimensional vector search. Demonstrates high rigor in quantitative latency trade-offs, but skipped MCP server sandboxing and struggled on multi-GPU speculative decoding.",
    completedMissions: [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16, 17, 19, 20, 21, 24, 28, 29, 30, 31],
    totalMissionsCompleted: 23,
    skippedTopics: [
      { day: 9, topic: "Multi-Modal & ColBERT Search", reason: "Focused on core text RAG systems" },
      { day: 13, topic: "System Prompting & Instruction Hierarchy", reason: "Completed standard security baseline instead" },
      { day: 18, topic: "Dynamic Tool Creation & Sandboxing", reason: "Prioritized LangGraph multi-agent orchestration" },
      { day: 22, topic: "FastMCP Custom Server Development", reason: "Skipped due to enterprise project deadline" },
      { day: 23, topic: "MCP Sandboxing & Permissions", reason: "Deferred to post-cohort review" },
      { day: 25, topic: "AWQ/GPTQ Quantization & FP8", reason: "Partial attempt only" }
    ],
    attempts: {
      1: { count: 1, avgScore: 95, status: "Mastered" },
      2: { count: 1, avgScore: 92, status: "Mastered" },
      3: { count: 2, avgScore: 88, status: "Completed" },
      4: { count: 1, avgScore: 94, status: "Mastered" },
      5: { count: 1, avgScore: 91, status: "Mastered" },
      6: { count: 1, avgScore: 96, status: "Mastered" },
      7: { count: 2, avgScore: 89, status: "Completed" },
      8: { count: 2, avgScore: 84, status: "Completed" },
      10: { count: 1, avgScore: 90, status: "Mastered" },
      11: { count: 2, avgScore: 85, status: "Completed" },
      12: { count: 1, avgScore: 94, status: "Mastered" },
      14: { count: 2, avgScore: 82, status: "Completed" },
      15: { count: 1, avgScore: 88, status: "Completed" },
      16: { count: 2, avgScore: 80, status: "Completed" },
      17: { count: 1, avgScore: 87, status: "Completed" },
      19: { count: 2, avgScore: 78, status: "Needs Review" },
      20: { count: 1, avgScore: 86, status: "Completed" },
      21: { count: 2, avgScore: 79, status: "Needs Review" },
      24: { count: 3, avgScore: 76, status: "Needs Review" },
      28: { count: 1, avgScore: 95, status: "Mastered" },
      29: { count: 1, avgScore: 92, status: "Mastered" },
      30: { count: 1, avgScore: 90, status: "Mastered" },
      31: { count: 1, avgScore: 94, status: "Mastered" }
    },
    learningSignals: {
      strengths: [
        "Exceptional grasp of HNSW graph indexing parameters (M, efSearch) and mathematical formulations.",
        "Deep familiarity with RAG Triad evaluation metrics (Faithfulness, Context Recall via Ragas).",
        "Clean, production-grade distributed tracing setup with OpenTelemetry and Langfuse."
      ],
      vulnerabilities: [
        "Avoids MCP protocol implementation details; skipped Days 22-23 (FastMCP & Tool Poisoning mitigations).",
        "Required 3 attempts on vLLM serving optimization (Day 24) and struggled with PagedAttention page sizing.",
        "Relies heavily on bi-encoders; needs probing on cross-encoder P99 latency trade-offs."
      ],
      codeHabits: "Writes modular, typing-annotated Python with robust error handling, but occasionally overlooks token budget limits.",
      velocity: "Fast starter (Days 1-12 in top 5%), slight slowdown during Agentic and Deployment modules."
    },
    recommendedProbeDays: [3, 6, 20, 24, 29]
  },
  {
    id: "candidate-2",
    name: "Priya Sharma",
    email: "priya.sharma@enterprise-ai.io",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    cohortTrack: "Enterprise Agentic AI Lead",
    experienceLevel: "Mid-Senior (4 yrs)",
    targetRole: "Autonomous Agents & Tool Orchestration Engineer",
    summary: "Top performer in Agentic AI (Days 15-19) and Model Context Protocol (Days 20-23). Mastered LangGraph state reducers and custom FastMCP servers. Skipped distributed vector sharding and needs probing on KV cache memory physics.",
    completedMissions: [1, 2, 4, 5, 7, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 28, 29, 30, 31],
    totalMissionsCompleted: 22,
    skippedTopics: [
      { day: 3, topic: "Hybrid Search & Cross-Encoder Reranking", reason: "Relied on high-dimensional semantic search only" },
      { day: 6, topic: "HNSW & IVF Algorithm Implementation", reason: "Used managed Pinecone abstractions" },
      { day: 8, topic: "Scaling & Distributed Vector Sharding", reason: "Out of scope for agentic application focus" },
      { day: 9, topic: "ColBERT Late Interaction", reason: "Skipped to begin LangGraph earlier" },
      { day: 24, topic: "vLLM & Continuous Batching Internals", reason: "Focused on API-level model consumption" },
      { day: 26, topic: "Speculative Decoding & KV Cache Management", reason: "Deferred to inference optimization track" },
      { day: 27, topic: "KEDA Kubernetes Autoscaling", reason: "Used serverless deployment wrappers" }
    ],
    attempts: {
      1: { count: 1, avgScore: 88, status: "Completed" },
      2: { count: 1, avgScore: 85, status: "Completed" },
      4: { count: 1, avgScore: 90, status: "Mastered" },
      5: { count: 2, avgScore: 82, status: "Completed" },
      7: { count: 1, avgScore: 86, status: "Completed" },
      10: { count: 1, avgScore: 92, status: "Mastered" },
      11: { count: 1, avgScore: 95, status: "Mastered" },
      12: { count: 1, avgScore: 98, status: "Mastered" },
      13: { count: 1, avgScore: 94, status: "Mastered" },
      15: { count: 1, avgScore: 99, status: "Mastered" },
      16: { count: 1, avgScore: 97, status: "Mastered" },
      17: { count: 1, avgScore: 96, status: "Mastered" },
      18: { count: 1, avgScore: 94, status: "Mastered" },
      19: { count: 1, avgScore: 92, status: "Mastered" },
      20: { count: 1, avgScore: 96, status: "Mastered" },
      21: { count: 1, avgScore: 95, status: "Mastered" },
      22: { count: 1, avgScore: 98, status: "Mastered" },
      23: { count: 1, avgScore: 91, status: "Mastered" },
      28: { count: 1, avgScore: 89, status: "Completed" },
      29: { count: 2, avgScore: 84, status: "Completed" },
      30: { count: 2, avgScore: 80, status: "Completed" },
      31: { count: 1, avgScore: 93, status: "Mastered" }
    },
    learningSignals: {
      strengths: [
        "Pioneered complex cyclic multi-agent supervision in LangGraph with human-in-the-loop validation.",
        "Built production FastMCP servers with stdio and SSE transport support and robust capability negotiation.",
        "Flawless Pydantic structured output enforcement with auto-healing schema retries."
      ],
      vulnerabilities: [
        "Limited exposure to low-level vector indexing (skipped Days 6 & 8); lacks intuition for recall-latency curves.",
        "Prone to assuming infinite context window; needs challenge on token cost scaling in multi-agent swarms.",
        "Has not implemented GPU kernel-level serving optimizations (vLLM / Speculative decoding)."
      ],
      codeHabits: "Creates elegant state graphs and modular tool registries; defensive architecture against prompt injections.",
      velocity: "Unmatched speed on Agentic (Days 15-19) and MCP (Days 20-23) missions with zero retries."
    },
    recommendedProbeDays: [8, 15, 16, 21, 22]
  },
  {
    id: "candidate-3",
    name: "Marcus Vance",
    email: "marcus.vance@enterprise-ai.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    cohortTrack: "Production AI Systems & Inference Architect",
    experienceLevel: "Senior (7 yrs)",
    targetRole: "Staff AI Infrastructure Engineer",
    summary: "Systems-first engineer with mastery over GPU serving (vLLM), quantization (AWQ/FP8), and Kubernetes cloud deployment (Days 24-27). Struggled with prompt engineering nuances and tree-of-thought search algorithms.",
    completedMissions: [1, 2, 3, 6, 7, 8, 12, 14, 20, 22, 24, 25, 26, 27, 28, 29, 30, 31],
    totalMissionsCompleted: 18,
    skippedTopics: [
      { day: 4, topic: "Parent Document & Contextual Compression", reason: "Focused on high-scale indexing performance" },
      { day: 5, topic: "Ragas Synthetic Evaluation", reason: "Used custom load-testing scripts instead" },
      { day: 9, topic: "ColBERT Late Interaction", reason: "Considered memory footprint too large for target budget" },
      { day: 10, topic: "Dynamic Few-Shot Exemplar Selection", reason: "Skipped in favor of structured JSON schema" },
      { day: 11, topic: "Tree-of-Thought & Reasoning Graphs", reason: "Found ToT too slow for real-time SLA targets" },
      { day: 13, topic: "System Prompting & Persona Boundaries", reason: "Handled security at network API gateway level" },
      { day: 15, topic: "ReAct Agent Loops", reason: "Replaced with deterministic deterministic pipelines" },
      { day: 16, topic: "Multi-Agent Swarm Orchestration", reason: "Skipped due to high latency overhead" },
      { day: 17, topic: "Episodic Agent Memory Systems", reason: "Used Redis semantic cache directly" },
      { day: 18, topic: "Dynamic Tool Creation", reason: "Restricted tools for safety reasons" },
      { day: 19, topic: "Reflexion Self-Correction", reason: "Used model cascading fallbacks" },
      { day: 21, topic: "MCP Dynamic Prompts", reason: "Focused on stdio FastMCP database connections" },
      { day: 23, topic: "MCP Tool Sandboxing", reason: "Handled via Kubernetes gVisor containers" }
    ],
    attempts: {
      1: { count: 1, avgScore: 84, status: "Completed" },
      2: { count: 1, avgScore: 89, status: "Completed" },
      3: { count: 3, avgScore: 78, status: "Needs Review" },
      6: { count: 4, avgScore: 92, status: "Mastered" },
      7: { count: 2, avgScore: 90, status: "Mastered" },
      8: { count: 1, avgScore: 96, status: "Mastered" },
      12: { count: 2, avgScore: 83, status: "Completed" },
      14: { count: 1, avgScore: 88, status: "Completed" },
      20: { count: 1, avgScore: 85, status: "Completed" },
      22: { count: 2, avgScore: 87, status: "Completed" },
      24: { count: 1, avgScore: 99, status: "Mastered" },
      25: { count: 1, avgScore: 98, status: "Mastered" },
      26: { count: 1, avgScore: 97, status: "Mastered" },
      27: { count: 1, avgScore: 99, status: "Mastered" },
      28: { count: 1, avgScore: 94, status: "Mastered" },
      29: { count: 1, avgScore: 91, status: "Mastered" },
      30: { count: 1, avgScore: 96, status: "Mastered" },
      31: { count: 1, avgScore: 98, status: "Mastered" }
    },
    learningSignals: {
      strengths: [
        "Unrivaled mastery of vLLM PagedAttention, KV cache memory calculations, and continuous batching.",
        "Deep expertise in AWQ vs GPTQ vs FP8 quantization on NVIDIA Hopper/Ada architectures.",
        "Architected robust KEDA Kubernetes GPU autoscaling based on queue depth and TTFT metrics."
      ],
      vulnerabilities: [
        "Dismissive of agentic AI frameworks; skipped entire Module 4 (Days 15-19) citing latency concerns.",
        "Required 4 attempts on Day 6 HNSW index build time vs RAM consumption trade-offs.",
        "Weak on prompt injection mitigation techniques and instruction hierarchy boundaries."
      ],
      codeHabits: "Writes ultra-performant C++/Python scripts with zero memory leaks; heavy focus on Prometheus metrics.",
      velocity: "Exponential acceleration in Module 6 (Serving) and Module 7 (Production Systems)."
    },
    recommendedProbeDays: [6, 15, 24, 25, 26]
  },
  {
    id: "candidate-4",
    name: "Elena Rostova",
    email: "elena.rostova@enterprise-ai.io",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    cohortTrack: "Applied AI Researcher & Prompt Architect",
    experienceLevel: "Mid-Level (3 yrs)",
    targetRole: "Senior Prompt & Evaluation Engineer",
    summary: "Expert in Prompt Engineering (Days 10-14) and RAG Evaluation Triad (Day 5). Strong theoretical grounding in in-context learning and reasoning graphs. Needs probing on distributed deployment and MCP protocol transports.",
    completedMissions: [1, 2, 3, 4, 5, 7, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 28, 29, 30, 31],
    totalMissionsCompleted: 20,
    skippedTopics: [
      { day: 6, topic: "HNSW Algorithm from Scratch", reason: "Used managed vector stores" },
      { day: 8, topic: "Distributed Sharding & Raft Consensus", reason: "Deferred infrastructure topics" },
      { day: 9, topic: "ColBERT Late Interaction", reason: "Focused on Cross-Encoder Reranking" },
      { day: 18, topic: "Dynamic Tool Creation & REPL", reason: "Focused on reasoning graphs" },
      { day: 21, topic: "MCP Resource URIs", reason: "Focused on MCP standard tools" },
      { day: 22, topic: "FastMCP Custom Server Deployment", reason: "Skipped backend server implementation" },
      { day: 23, topic: "MCP Sandboxing & Permissions", reason: "Handled via prompt guardrails" },
      { day: 24, topic: "vLLM PagedAttention Internals", reason: "Used OpenAI / Anthropic APIs" },
      { day: 25, topic: "Quantization Algorithms (AWQ/GPTQ)", reason: "Model compression out of focus" },
      { day: 26, topic: "Speculative Decoding", reason: "Inference engine optimization skipped" },
      { day: 27, topic: "Kubernetes GPU Operators", reason: "Cloud infrastructure skipped" }
    ],
    attempts: {
      1: { count: 1, avgScore: 92, status: "Mastered" },
      2: { count: 1, avgScore: 94, status: "Mastered" },
      3: { count: 1, avgScore: 90, status: "Mastered" },
      4: { count: 1, avgScore: 93, status: "Mastered" },
      5: { count: 1, avgScore: 98, status: "Mastered" },
      7: { count: 2, avgScore: 82, status: "Completed" },
      10: { count: 1, avgScore: 99, status: "Mastered" },
      11: { count: 1, avgScore: 97, status: "Mastered" },
      12: { count: 1, avgScore: 96, status: "Mastered" },
      13: { count: 1, avgScore: 98, status: "Mastered" },
      14: { count: 1, avgScore: 95, status: "Mastered" },
      15: { count: 2, avgScore: 84, status: "Completed" },
      16: { count: 3, avgScore: 79, status: "Needs Review" },
      17: { count: 2, avgScore: 81, status: "Completed" },
      19: { count: 1, avgScore: 88, status: "Completed" },
      20: { count: 2, avgScore: 78, status: "Needs Review" },
      28: { count: 1, avgScore: 92, status: "Mastered" },
      29: { count: 1, avgScore: 96, status: "Mastered" },
      30: { count: 2, avgScore: 85, status: "Completed" },
      31: { count: 1, avgScore: 91, status: "Mastered" }
    },
    learningSignals: {
      strengths: [
        "Pinnacle scores across Prompt Engineering (Days 10-14) with deep understanding of instruction hierarchies.",
        "Mastered Ragas synthetic evaluation datasets and triadic hallucination detection.",
        "Strong implementation of NeMo Guardrails and PII redaction pipelines using Presidio."
      ],
      vulnerabilities: [
        "Skipped all of Module 6 (AI Deployment & Serving); zero experience with vLLM or quantization.",
        "Required 3 attempts on LangGraph Multi-Agent coordination (Day 16) due to state deadlock bugs.",
        "Superficial understanding of MCP JSON-RPC 2.0 transports and capability exchanges."
      ],
      codeHabits: "Writes comprehensive test suites and benchmark scripts; documentation is exceptionally thorough.",
      velocity: "Consistent high performance on algorithmic reasoning and prompt design; drops on infrastructure tasks."
    },
    recommendedProbeDays: [5, 11, 13, 16, 29]
  },
  {
    id: "candidate-5",
    name: "David Kim",
    email: "david.kim@enterprise-ai.io",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    cohortTrack: "Full-Stack AI Integrator",
    experienceLevel: "Junior-Mid (2 yrs)",
    targetRole: "Full-Stack AI Application Developer",
    summary: "Balanced participant who completed baseline missions across all 7 modules. Solid breadth of understanding from RAG to MCP and vLLM, but lacks senior architectural depth when probed on distributed failure modes.",
    completedMissions: [1, 2, 3, 5, 6, 7, 10, 11, 12, 13, 15, 16, 17, 20, 21, 22, 24, 25, 28, 29, 30, 31],
    totalMissionsCompleted: 22,
    skippedTopics: [
      { day: 4, topic: "Parent Document & Contextual Compression", reason: "Used standard recursive chunking" },
      { day: 8, topic: "Distributed Sharding & Raft Consensus", reason: "Used managed single-node vector instance" },
      { day: 9, topic: "ColBERT Late Interaction", reason: "Focused on bi-encoder embeddings" },
      { day: 14, topic: "Needle-In-A-Haystack Benchmarks", reason: "Relied on published model specs" },
      { day: 18, topic: "Dynamic Tool Creation in Sandboxes", reason: "Used pre-configured toolkits" },
      { day: 19, topic: "Reflexion Self-Correction", reason: "Implemented basic retry loops" },
      { day: 23, topic: "MCP Sandboxing Security", reason: "Deferred to enterprise security team" },
      { day: 26, topic: "Speculative Decoding Algorithms", reason: "Standard vLLM serving was sufficient" },
      { day: 27, topic: "Kubernetes GPU Operators", reason: "Deployed on Docker Compose" }
    ],
    attempts: {
      1: { count: 1, avgScore: 85, status: "Completed" },
      2: { count: 2, avgScore: 80, status: "Completed" },
      3: { count: 2, avgScore: 82, status: "Completed" },
      5: { count: 3, avgScore: 75, status: "Needs Review" },
      6: { count: 2, avgScore: 79, status: "Needs Review" },
      7: { count: 1, avgScore: 84, status: "Completed" },
      10: { count: 1, avgScore: 88, status: "Completed" },
      11: { count: 2, avgScore: 81, status: "Completed" },
      12: { count: 1, avgScore: 90, status: "Mastered" },
      13: { count: 1, avgScore: 86, status: "Completed" },
      15: { count: 2, avgScore: 83, status: "Completed" },
      16: { count: 2, avgScore: 80, status: "Completed" },
      17: { count: 1, avgScore: 85, status: "Completed" },
      20: { count: 3, avgScore: 74, status: "Needs Review" },
      21: { count: 2, avgScore: 82, status: "Completed" },
      22: { count: 2, avgScore: 81, status: "Completed" },
      24: { count: 2, avgScore: 80, status: "Completed" },
      25: { count: 2, avgScore: 78, status: "Needs Review" },
      28: { count: 1, avgScore: 88, status: "Completed" },
      29: { count: 1, avgScore: 87, status: "Completed" },
      30: { count: 1, avgScore: 89, status: "Completed" },
      31: { count: 2, avgScore: 84, status: "Completed" }
    },
    learningSignals: {
      strengths: [
        "Well-rounded generalist with completed projects in all 7 modules.",
        "Excellent practical understanding of building React/Node.js full-stack UIs with FastMCP and LangChain.",
        "Consistent execution velocity across the 31 days with high persistence on challenging topics."
      ],
      vulnerabilities: [
        "Struggles when questioned on low-level mathematical foundations (e.g. HNSW graph diameter, AWQ saliency).",
        "Required 3 attempts on RAG Triad evaluation (Day 5) and MCP Protocol Architecture (Day 20).",
        "Tendency to accept default library parameters without tuning for specific latency/cost trade-offs."
      ],
      codeHabits: "Pragmatic, clean full-stack code; quick to build working prototypes, needs guidance on production hardening.",
      velocity: "Steady, uninterrupted pace throughout all 31 days."
    },
    recommendedProbeDays: [1, 5, 12, 20, 24]
  },
  {
    id: "candidate-6",
    name: "Aisha Morales",
    email: "aisha.morales@enterprise-ai.io",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    cohortTrack: "LLM Platform & Observability Specialist",
    experienceLevel: "Mid-Senior (4 yrs)",
    targetRole: "AI Platform & Reliability Engineer",
    summary: "Strong focus on Production Systems (Days 28-31) and Inference Serving (Days 24-27). Expert in semantic caching, rate limiting, and distributed tracing. Skipped few-shot prompt engineering and dynamic exemplar selection.",
    completedMissions: [1, 2, 3, 5, 6, 7, 8, 12, 14, 15, 17, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31],
    totalMissionsCompleted: 22,
    skippedTopics: [
      { day: 4, topic: "Parent Document Retrieval", reason: "Standard chunking met latency SLA" },
      { day: 9, topic: "ColBERT Late Interaction", reason: "High token storage overhead" },
      { day: 10, topic: "Few-Shot Dynamic Exemplar Selection", reason: "Focused on zero-shot structured schemas" },
      { day: 11, topic: "Tree-of-Thought Search", reason: "Considered too costly for production traffic" },
      { day: 13, topic: "System Prompting & Persona Tuning", reason: "Handled security in NeMo guardrails" },
      { day: 16, topic: "Multi-Agent Swarm Orchestration", reason: "Preferred single-agent deterministic tools" },
      { day: 18, topic: "Dynamic Tool Creation in REPL", reason: "Disallowed dynamic code generation for compliance" },
      { day: 19, topic: "Reflexion Self-Correction", reason: "Used rate-limited fallback routing" },
      { day: 23, topic: "MCP Sandboxing & Permissions", reason: "Integrated with corporate OAuth gateway" }
    ],
    attempts: {
      1: { count: 1, avgScore: 88, status: "Completed" },
      2: { count: 1, avgScore: 90, status: "Mastered" },
      3: { count: 1, avgScore: 89, status: "Completed" },
      5: { count: 2, avgScore: 84, status: "Completed" },
      6: { count: 2, avgScore: 86, status: "Completed" },
      7: { count: 1, avgScore: 92, status: "Mastered" },
      8: { count: 2, avgScore: 88, status: "Completed" },
      12: { count: 1, avgScore: 95, status: "Mastered" },
      14: { count: 1, avgScore: 91, status: "Mastered" },
      15: { count: 2, avgScore: 80, status: "Completed" },
      17: { count: 1, avgScore: 89, status: "Completed" },
      20: { count: 1, avgScore: 90, status: "Mastered" },
      21: { count: 1, avgScore: 92, status: "Mastered" },
      22: { count: 1, avgScore: 94, status: "Mastered" },
      24: { count: 1, avgScore: 96, status: "Mastered" },
      25: { count: 2, avgScore: 85, status: "Completed" },
      26: { count: 1, avgScore: 93, status: "Mastered" },
      27: { count: 1, avgScore: 95, status: "Mastered" },
      28: { count: 1, avgScore: 99, status: "Mastered" },
      29: { count: 1, avgScore: 98, status: "Mastered" },
      30: { count: 1, avgScore: 99, status: "Mastered" },
      31: { count: 1, avgScore: 97, status: "Mastered" }
    },
    learningSignals: {
      strengths: [
        "Unmatched expertise in Semantic Caching (GPTCache/Redis) and Token Bucket Rate Limiting (Day 30).",
        "Engineered end-to-end OpenTelemetry distributed tracing with custom Prometheus alerting rules.",
        "Deep understanding of safety guardrails (NeMo & Llama Guard) and PII token deanonymization."
      ],
      vulnerabilities: [
        "Minimal experience with prompt optimization techniques; skipped Days 10, 11, and 13.",
        "Skeptical of multi-agent patterns; struggles to articulate when agent autonomy outweighs latency costs.",
        "Needs probing on how RAG Triad metrics correlate with distributed tracing spans."
      ],
      codeHabits: "Builds production-hardened infrastructure with comprehensive health checks, metrics, and CI/CD pipelines.",
      velocity: "Consistent high marks in infrastructure and reliability engineering."
    },
    recommendedProbeDays: [7, 12, 24, 28, 30]
  }
];
