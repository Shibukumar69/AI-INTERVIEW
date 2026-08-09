// backend/services/interviewAgent.js
// Multi-Turn Adaptive Interview Agent for the 31-Day Enterprise AI Engineering Cohort
import { CURRICULUM_DAYS, CURRICULUM_MODULES } from "../data/curriculum.js";
import { CANDIDATE_PROFILES } from "../data/candidates.js";
import fetch from "node-fetch";

// Active in-memory interview session store
const interviewSessions = new Map();

// Configuration store for API keys and provider selection
export const aiConfig = {
  activeProvider: process.env.AI_PROVIDER || (process.env.GEMINI_API_KEY ? "gemini" : process.env.GROQ_API_KEY ? "groq" : process.env.OPENAI_API_KEY ? "openai" : "builtin"),
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
  groqApiKey: process.env.GROQ_API_KEY || "",
  groqModel: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || "http://localhost:11434",
  ollamaModel: process.env.OLLAMA_MODEL_NAME || "mistral"
};

/**
 * Initialize a new interview session
 */
export function initializeInterviewSession({
  sessionId: providedSessionId = null,
  candidateId = "cand-001",
  customCandidate = null,
  targetDays = null,
  customInstructions = "",
  mode = "adaptive"
}) {
  let candidate = customCandidate;
  if (!candidate) {
    candidate = CANDIDATE_PROFILES.find((c) => c.id === candidateId || c.officialId === candidateId) || CANDIDATE_PROFILES[0];
  }

  // Pick at least 4-5 target curriculum days across distinct modules if not specified
  let selectedDays = targetDays;
  if (!selectedDays || !Array.isArray(selectedDays) || selectedDays.length === 0) {
    if (candidate.recommendedProbeDays && candidate.recommendedProbeDays.length >= 4) {
      selectedDays = candidate.recommendedProbeDays;
    } else {
      selectedDays = [1, 6, 12, 22, 28];
    }
  }

  // Ensure selected days are unique and sorted
  selectedDays = Array.from(new Set(selectedDays));

  const sessionId = providedSessionId || "session_" + (candidate.id || "cand-001") + "_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);

  const initialDayNumber = selectedDays[0] || 1;
  const initialCurriculumDay = CURRICULUM_DAYS.find((d) => d.day === initialDayNumber) || CURRICULUM_DAYS[0];

  // Select initial question tailored to candidate
  const initialQuestionText = getInitialQuestionForDay(initialCurriculumDay, candidate);

  // Set of asked question texts/hashes to strictly avoid repeating questions
  const askedQuestions = new Set([normalizeQuestionText(initialQuestionText)]);

  const session = {
    sessionId,
    candidateId: candidate.id,
    candidate,
    mode,
    customInstructions,
    targetDays: selectedDays,
    currentDayIndex: 0,
    currentDayNumber: initialDayNumber,
    consecutiveFollowUpsOnCurrentDay: 0,
    maxFollowUpsPerDay: 2,
    coveredDays: [initialDayNumber],
    askedQuestions,
    questionHistory: [
      {
        questionId: "q_1",
        questionNumber: 1,
        dayNumber: initialDayNumber,
        moduleNumber: initialCurriculumDay.moduleId,
        moduleTitle: initialCurriculumDay.moduleTitle,
        topic: initialCurriculumDay.topic,
        questionText: initialQuestionText,
        isFollowUp: false,
        parentQuestionId: null,
        userResponse: null,
        userCode: null,
        evaluation: null,
        timestamp: new Date()
      }
    ],
    conversationHistory: [
      {
        role: "interviewer",
        text: `Welcome ${candidate.name}! We're conducting your 31-Day Enterprise AI Cohort Technical Interview. Let's begin with your work on Day ${initialDayNumber} (${initialCurriculumDay.topic}):\n\n${initialQuestionText}`,
        questionText: initialQuestionText,
        dayNumber: initialDayNumber,
        isFollowUp: false,
        timestamp: new Date()
      }
    ],
    turnCount: 1,
    minRequiredQuestions: 8,
    minRequiredDays: 4,
    status: "in-progress",
    startTime: new Date(),
    endTime: null,
    evaluationReport: null
  };

  interviewSessions.set(sessionId, session);
  return session;
}

/**
 * Handle a candidate's response and generate the next turn (adaptive follow-up or next day question)
 */
export async function processInterviewChat({
  sessionId,
  userAnswerText = "",
  userCode = "",
  audioTranscription = ""
}) {
  let session = interviewSessions.get(sessionId);
  if (!session) {
    session = initializeInterviewSession({ sessionId, candidateId: "candidate-1" });
  }

  const combinedAnswer = (userAnswerText || audioTranscription || "").trim();
  const currentQIndex = session.questionHistory.length - 1;
  const currentQ = session.questionHistory[currentQIndex];

  // Record candidate's answer
  currentQ.userResponse = combinedAnswer || "(No verbal answer provided)";
  currentQ.userCode = userCode || "";

  session.conversationHistory.push({
    role: "candidate",
    text: combinedAnswer || (userCode ? "Code implementation submitted." : "(Empty submission)"),
    code: userCode || null,
    dayNumber: session.currentDayNumber,
    timestamp: new Date()
  });

  // Evaluate candidate's turn with deep strict AI
  const turnEval = await evaluateSingleTurn({
    question: currentQ.questionText,
    answer: combinedAnswer,
    code: userCode,
    dayNumber: session.currentDayNumber,
    candidate: session.candidate,
    session
  });

  currentQ.evaluation = turnEval;

  // Decide whether to ask an intelligent follow-up or transition to the next curriculum day
  const shouldFollowUp = decideFollowUpStrategy({
    turnEval,
    consecutiveFollowUps: session.consecutiveFollowUpsOnCurrentDay,
    maxFollowUps: session.maxFollowUpsPerDay,
    totalQuestions: session.questionHistory.length,
    coveredDaysCount: session.coveredDays.length,
    minRequiredQuestions: session.minRequiredQuestions,
    minRequiredDays: session.minRequiredDays
  });

  let nextQuestionText = "";
  let isFollowUp = false;
  let nextDayNumber = session.currentDayNumber;
  let parentQuestionId = null;

  if (shouldFollowUp) {
    isFollowUp = true;
    parentQuestionId = currentQ.questionId;
    session.consecutiveFollowUpsOnCurrentDay += 1;

    nextQuestionText = await generateIntelligentFollowUp({
      currentQuestion: currentQ.questionText,
      candidateAnswer: combinedAnswer,
      candidateCode: userCode,
      dayNumber: session.currentDayNumber,
      candidate: session.candidate,
      session,
      turnEval
    });
  } else {
    // Transition to the next curriculum day
    session.consecutiveFollowUpsOnCurrentDay = 0;
    session.currentDayIndex += 1;

    if (session.currentDayIndex < session.targetDays.length) {
      nextDayNumber = session.targetDays[session.currentDayIndex];
    } else {
      const allDays = CURRICULUM_DAYS.map((d) => d.day);
      const uncovered = allDays.filter((d) => !session.coveredDays.includes(d));
      nextDayNumber = uncovered.length > 0 ? uncovered[0] : (session.currentDayNumber % 31) + 1;
    }

    if (!session.coveredDays.includes(nextDayNumber)) {
      session.coveredDays.push(nextDayNumber);
    }
    session.currentDayNumber = nextDayNumber;

    const nextCurriculumDay = CURRICULUM_DAYS.find((d) => d.day === nextDayNumber) || CURRICULUM_DAYS[0];
    nextQuestionText = await generateNextDayQuestion({
      curriculumDay: nextCurriculumDay,
      candidate: session.candidate,
      session
    });
  }

  // Register question to prevent future duplicates
  if (session.askedQuestions) {
    session.askedQuestions.add(normalizeQuestionText(nextQuestionText));
  }

  const nextQId = `q_${session.questionHistory.length + 1}`;
  const nextCurriculumDay = CURRICULUM_DAYS.find((d) => d.day === nextDayNumber) || CURRICULUM_DAYS[0];

  const newQuestionObj = {
    questionId: nextQId,
    questionNumber: session.questionHistory.length + 1,
    dayNumber: nextDayNumber,
    moduleNumber: nextCurriculumDay.moduleId,
    moduleTitle: nextCurriculumDay.moduleTitle,
    topic: nextCurriculumDay.topic,
    questionText: nextQuestionText,
    isFollowUp,
    parentQuestionId,
    userResponse: null,
    userCode: null,
    evaluation: null,
    timestamp: new Date()
  };

  session.questionHistory.push(newQuestionObj);
  session.turnCount = session.questionHistory.length;

  const interviewerMsg = {
    role: "interviewer",
    text: nextQuestionText,
    questionText: nextQuestionText,
    dayNumber: nextDayNumber,
    isFollowUp,
    timestamp: new Date()
  };
  session.conversationHistory.push(interviewerMsg);

  return {
    sessionId: session.sessionId,
    turnCount: session.turnCount,
    isFollowUp,
    parentQuestionId,
    currentDayNumber: session.currentDayNumber,
    moduleTitle: nextCurriculumDay.moduleTitle,
    topic: nextCurriculumDay.topic,
    questionText: nextQuestionText,
    nextQuestionText: nextQuestionText,
    interviewerText: nextQuestionText,
    reply: nextQuestionText,
    coveredDays: session.coveredDays,
    coveredDaysCount: session.coveredDays.length,
    minDaysMet: session.coveredDays.length >= session.minRequiredDays,
    minQuestionsMet: session.questionHistory.length >= session.minRequiredQuestions,
    lastTurnEvaluation: turnEval,
    evaluation: turnEval,
    conversationHistory: session.conversationHistory
  };
}

/**
 * Conclude interview and generate structured diagnostic feedback
 */
export async function finalizeInterviewEvaluation(sessionId) {
  let session = interviewSessions.get(sessionId);
  if (!session) {
    session = initializeInterviewSession({ sessionId, candidateId: "candidate-1" });
  }

  session.status = "completed";
  session.endTime = new Date();

  // Calculate scores across questions
  const evaluatedQuestions = session.questionHistory.filter((q) => q.evaluation);
  const totalQuestions = evaluatedQuestions.length || 1;

  let totalTechScore = 0;
  let totalArchScore = 0;
  let totalEdgeScore = 0;
  let totalCommScore = 0;

  // Track scores by 8 modules
  const moduleScores = {
    1: { name: "Environment & Tooling", total: 0, count: 0 },
    2: { name: "Data Foundations", total: 0, count: 0 },
    3: { name: "Embeddings & Vector Search", total: 0, count: 0 },
    4: { name: "LLM Core & Fine-Tuning", total: 0, count: 0 },
    5: { name: "Chatbot Application Build", total: 0, count: 0 },
    6: { name: "Agentic AI & MCP", total: 0, count: 0 },
    7: { name: "Evaluation & Deployment", total: 0, count: 0 },
    8: { name: "Production & Capstone", total: 0, count: 0 }
  };

  evaluatedQuestions.forEach((q) => {
    const e = q.evaluation;
    totalTechScore += (e.technicalScore !== undefined ? e.technicalScore : 50);
    totalArchScore += (e.architectureScore !== undefined ? e.architectureScore : 50);
    totalEdgeScore += (e.edgeCaseScore !== undefined ? e.edgeCaseScore : 30);
    totalCommScore += (e.communicationScore !== undefined ? e.communicationScore : 50);

    const modId = q.moduleNumber || 1;
    if (moduleScores[modId]) {
      moduleScores[modId].total += (e.technicalScore !== undefined ? e.technicalScore : 50);
      moduleScores[modId].count += 1;
    }
  });

  const avgTech = Math.round(totalTechScore / totalQuestions);
  const avgArch = Math.round(totalArchScore / totalQuestions);
  const avgEdge = Math.round(totalEdgeScore / totalQuestions);
  const avgComm = Math.round(totalCommScore / totalQuestions);

  const overallScore = Math.round(avgTech * 0.4 + avgArch * 0.3 + avgEdge * 0.2 + avgComm * 0.1);

  // Determine Enterprise Readiness Grade strictly based on overallScore
  let readinessGrade = "Junior Cohort Apprentice (Needs Reinforcement)";
  if (overallScore >= 90) {
    readinessGrade = "L6 Staff AI Architect & Systems Lead";
  } else if (overallScore >= 80) {
    readinessGrade = "L5 Senior AI Systems Engineer";
  } else if (overallScore >= 70) {
    readinessGrade = "L4 Enterprise AI Software Engineer";
  } else if (overallScore >= 55) {
    readinessGrade = "L3 Associate AI Engineer";
  } else if (overallScore >= 35) {
    readinessGrade = "Early Cohort Student (Foundations Required)";
  } else {
    readinessGrade = "Not Recommended (Failed Technical Verification)";
  }

  // Format module breakdown for Radar / Bar Chart
  const radarChartData = Object.entries(moduleScores).map(([modId, modData]) => {
    const calculatedScore = modData.count > 0 ? Math.round(modData.total / modData.count) : Math.max(10, avgTech - 5);
    return {
      moduleId: parseInt(modId),
      moduleName: modData.name,
      score: calculatedScore,
      questionsAsked: modData.count
    };
  });

  // Extract strengths & critical gaps
  const candidate = session.candidate;
  const verifiedStrengths = [];
  const criticalGaps = [];

  evaluatedQuestions.forEach((q) => {
    if (q.evaluation?.strengthsIdentified && Array.isArray(q.evaluation.strengthsIdentified)) {
      q.evaluation.strengthsIdentified.forEach((s) => {
        if (s && !verifiedStrengths.includes(s) && verifiedStrengths.length < 4) {
          verifiedStrengths.push(s);
        }
      });
    }
  });

  evaluatedQuestions.forEach((q) => {
    if (q.evaluation?.gapsIdentified && Array.isArray(q.evaluation.gapsIdentified)) {
      q.evaluation.gapsIdentified.forEach((g) => {
        if (g && !criticalGaps.includes(g) && criticalGaps.length < 4) {
          criticalGaps.push(g);
        }
      });
    }
  });

  if (verifiedStrengths.length === 0 && overallScore >= 60) {
    verifiedStrengths.push("Demonstrated basic conceptual familiarity with AI engineering topics.");
  } else if (verifiedStrengths.length === 0) {
    verifiedStrengths.push("No verified technical strengths identified during this session.");
  }

  if (criticalGaps.length === 0) {
    if (avgEdge < 60) {
      criticalGaps.push("Critical gap in edge-case handling, failure recovery, and circuit breaker policies.");
    }
    if (avgTech < 60) {
      criticalGaps.push("Needs significant reinforcement on core algorithmic principles and implementation specifics.");
    }
  }

  const report = {
    sessionId: session.sessionId,
    candidate: {
      id: candidate.id,
      name: candidate.name,
      email: candidate.email,
      avatar: candidate.avatar,
      cohortTrack: candidate.cohortTrack,
      experienceLevel: candidate.experienceLevel,
      targetRole: candidate.targetRole
    },
    overallScore,
    readinessGrade,
    metrics: {
      avgTechnical: avgTech,
      avgArchitecture: avgArch,
      avgEdgeCases: avgEdge,
      avgCommunication: avgComm
    },
    requirementsVerification: {
      totalQuestions: session.questionHistory.length,
      minQuestionsRequired: session.minRequiredQuestions,
      minQuestionsMet: session.questionHistory.length >= session.minRequiredQuestions,
      coveredDays: session.coveredDays,
      coveredDaysCount: session.coveredDays.length,
      minDaysRequired: session.minRequiredDays,
      minDaysMet: session.coveredDays.length >= session.minRequiredDays
    },
    radarChartData,
    strengths: verifiedStrengths,
    criticalGaps: criticalGaps,
    personalizedStudyPlan: generateStudyPlan(candidate, avgTech, radarChartData),
    turnByTurnReview: session.questionHistory.map((q) => ({
      questionId: q.questionId,
      questionNumber: q.questionNumber,
      dayNumber: q.dayNumber,
      moduleNumber: q.moduleNumber,
      moduleTitle: q.moduleTitle,
      topic: q.topic,
      questionText: q.questionText,
      isFollowUp: q.isFollowUp,
      candidateResponse: q.userResponse,
      candidateCode: q.userCode,
      evaluation: q.evaluation || {
        technicalScore: 10,
        architectureScore: 10,
        edgeCaseScore: 0,
        communicationScore: 20,
        feedback: "No evaluation recorded for this turn.",
        idealEngineeringAnswer: "Production implementation requires explicit architecture and failure handling."
      }
    })),
    completedAt: session.endTime
  };

  session.evaluationReport = report;
  return report;
}

/**
 * Get session details
 */
export function getInterviewSession(sessionId) {
  return interviewSessions.get(sessionId) || null;
}

/**
 * List all active sessions
 */
export function getAllInterviewSessions() {
  return Array.from(interviewSessions.values());
}

// -------------------------------------------------------------
// INTERNAL INTELLIGENT HELPER FUNCTIONS
// -------------------------------------------------------------

function normalizeQuestionText(qText) {
  if (!qText) return "";
  return qText.toLowerCase().replace(/[^a-z0-9]/g, " ").trim().replace(/\s+/g, " ");
}

function getInitialQuestionForDay(curriculumDay, candidate) {
  if (curriculumDay.sampleQuestions && curriculumDay.sampleQuestions.length > 0) {
    const attemptInfo = candidate.attempts?.[curriculumDay.day];
    if (attemptInfo && attemptInfo.count > 1) {
      return `Welcome ${candidate.name}. In Day ${curriculumDay.day} (${curriculumDay.topic}), you worked on this module with ${attemptInfo.count} iteration attempts. Can you explain the core architectural trade-offs you encountered and how you optimized your final implementation?`;
    }
    return curriculumDay.sampleQuestions[0];
  }
  return `In Day ${curriculumDay.day} (${curriculumDay.topic}), walk me through your technical implementation and the critical engineering decisions you made.`;
}

function decideFollowUpStrategy({
  turnEval,
  consecutiveFollowUps,
  maxFollowUps,
  totalQuestions,
  coveredDaysCount,
  minRequiredQuestions,
  minRequiredDays
}) {
  if (consecutiveFollowUps >= maxFollowUps) {
    return false;
  }
  if (coveredDaysCount < minRequiredDays && totalQuestions >= 5 && consecutiveFollowUps >= 1) {
    return false;
  }
  if (turnEval && turnEval.technicalScore >= 45 && consecutiveFollowUps < 1) {
    return true;
  }
  if (consecutiveFollowUps === 0) {
    return true;
  }
  return false;
}

/**
 * Deep multi-dimensional evaluation of a candidate turn
 */
async function evaluateSingleTurn({ question, answer, code, dayNumber, candidate, session }) {
  const curriculumDay = CURRICULUM_DAYS.find((d) => d.day === dayNumber) || CURRICULUM_DAYS[0];

  // 1. Try Gemini Provider
  if (aiConfig.activeProvider === "gemini" && aiConfig.geminiApiKey) {
    try {
      return await evaluateWithGemini({ question, answer, code, curriculumDay, candidate });
    } catch (err) {
      console.warn("Gemini evaluation fallback:", err.message);
    }
  }

  // 2. Try Groq Provider (Ultra-fast Llama 3.3 70B)
  if (aiConfig.activeProvider === "groq" && aiConfig.groqApiKey) {
    try {
      return await evaluateWithGroq({ question, answer, code, curriculumDay, candidate });
    } catch (err) {
      console.warn("Groq evaluation fallback:", err.message);
    }
  }

  // 3. Try OpenAI Provider
  if (aiConfig.activeProvider === "openai" && aiConfig.openaiApiKey) {
    try {
      return await evaluateWithOpenAI({ question, answer, code, curriculumDay, candidate });
    } catch (err) {
      console.warn("OpenAI evaluation fallback:", err.message);
    }
  }

  // 4. Try Ollama Local Provider
  if (aiConfig.activeProvider === "ollama" && aiConfig.ollamaBaseUrl) {
    try {
      return await evaluateWithOllama({ question, answer, code, curriculumDay, candidate });
    } catch (err) {
      console.warn("Ollama evaluation fallback:", err.message);
    }
  }

  // 5. State-of-the-art Built-in Semantic AI Evaluation Engine (Strict Relevance & Scoring)
  return evaluateWithBuiltinEngine({ question, answer, code, curriculumDay, candidate });
}

/**
 * Enhanced Built-in Semantic & Natural Language Evaluation Engine
 * Strictly verifies relevance, accuracy, depth, edge cases, and failure recovery.
 */
function evaluateWithBuiltinEngine({ question, answer, code, curriculumDay, candidate }) {
  const text = (answer || "").trim().toLowerCase();
  const codeText = (code || "").trim().toLowerCase();
  const fullContent = text + " " + codeText;
  const words = fullContent.split(/\s+/).filter((w) => w.length > 0);

  // -------------------------------------------------------------
  // 1. EVASION & JUNK / GIBBERISH / OFF-TOPIC DETECTION
  // -------------------------------------------------------------
  const evasionPhrases = [
    "dont know", "don't know", "no idea", "hello", "hi", "test", "testing",
    "kuch bhi", "nahi pata", "mujhe nahi", "asdf", "qwerty", "random", "xyz",
    "nothing", "skip", "idk", "blah", "hahaha", "pass", "ok", "okay", "yes", "no", "na", "none"
  ];

  const isExactEvasion = words.length <= 8 && evasionPhrases.some((p) => text.includes(p));
  const hasRepeatingChars = /(.)\1{4,}/.test(text); // e.g. "aaaaa", "zzzzzz"
  const isTooShortToAnswer = words.length < 4 && (!code || code.trim().length < 15);

  // -------------------------------------------------------------
  // 2. CONCEPT & TOPIC RELEVANCE EXTRACTION
  // -------------------------------------------------------------
  const matchedConcepts = [];
  const targetConcepts = [
    ...(curriculumDay.keyConcepts || []),
    ...(curriculumDay.toolsUsed || []),
    curriculumDay.topic
  ];

  targetConcepts.forEach((concept) => {
    if (!concept) return;
    const cleanConcept = concept.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
    const subParts = cleanConcept.split(/\s+/).filter((p) => p.length > 3);
    
    if (fullContent.includes(cleanConcept)) {
      matchedConcepts.push(concept);
    } else if (subParts.length > 0 && subParts.some((p) => fullContent.includes(p))) {
      matchedConcepts.push(concept);
    }
  });

  // General AI Engineering Vocab for relevance
  const generalEngineeringTerms = [
    "database", "index", "vector", "pipeline", "model", "latency", "memory", "cache", "async",
    "schema", "api", "query", "embedding", "chunk", "server", "docker", "python", "fastapi",
    "rag", "mcp", "vllm", "token", "gpu", "retry", "fallback", "error", "client", "agent",
    "prompt", "function", "class", "def", "import", "return", "const", "interface", "hnsw",
    "bm25", "quantiz", "sla", "p99", "p50", "pydantic", "langgraph", "ollama", "chroma", "pinecone"
  ];

  const generalMatches = generalEngineeringTerms.filter((term) => fullContent.includes(term));
  const uniqueMatched = Array.from(new Set(matchedConcepts));

  // -------------------------------------------------------------
  // 3. ZERO / NEAR-ZERO SCORING FOR IRRELEVANT / JUNK ANSWERS
  // -------------------------------------------------------------
  if (isExactEvasion || hasRepeatingChars || (uniqueMatched.length === 0 && generalMatches.length === 0) || isTooShortToAnswer) {
    const technicalScore = isTooShortToAnswer ? 5 : Math.floor(Math.random() * 6) + 5; // 5-10%
    const architectureScore = Math.floor(Math.random() * 5) + 5; // 5-9%
    const edgeCaseScore = 0;
    const communicationScore = words.length < 5 ? 10 : 20;

    return {
      technicalScore,
      architectureScore,
      edgeCaseScore,
      communicationScore,
      feedback: `The submitted response is irrelevant, evasive, or lacks technical substance for Day ${curriculumDay.day} (${curriculumDay.topic}). Enterprise technical rounds require concrete architectural implementations, trade-offs, and failure recovery mechanisms.`,
      strengthsIdentified: [],
      gapsIdentified: [
        `Failed to answer the question regarding ${curriculumDay.topic}`,
        "Zero relevant engineering concepts or trade-offs provided"
      ],
      matchedConcepts: [],
      idealEngineeringAnswer: `### Staff-Level Architecture for Day ${curriculumDay.day} (${curriculumDay.topic})
1. **System Architecture**: Use ${(curriculumDay.toolsUsed || ["Standard Tooling"]).join(", ")} configured for high throughput and sub-50ms P99 latency.
2. **Failure Modes**: Handle edge cases with exponential backoff retries, circuit breakers, and schema validation.
3. **Observability**: Instrument OpenTelemetry spans to trace token attribution and latency per request.`
    };
  }

  // -------------------------------------------------------------
  // 4. REALISTIC GRADED SCORING FOR TECHNICAL ANSWERS
  // -------------------------------------------------------------
  let technicalScore = 40;
  let architectureScore = 35;
  let edgeCaseScore = 20;
  let communicationScore = 45;

  const strengthsIdentified = [];
  const gapsIdentified = [];

  // Concept coverage bonus
  if (uniqueMatched.length >= 2) {
    technicalScore += 30;
    architectureScore += 26;
    strengthsIdentified.push(`Demonstrated solid grasp of core Day ${curriculumDay.day} concepts (${uniqueMatched.slice(0, 3).join(", ")}).`);
  } else if (uniqueMatched.length >= 1) {
    technicalScore += 22;
    architectureScore += 18;
    strengthsIdentified.push(`Referenced relevant curriculum tools/concepts (${uniqueMatched.slice(0, 2).join(", ")}).`);
  } else if (generalMatches.length >= 2) {
    technicalScore += 12;
    architectureScore += 10;
    gapsIdentified.push(`Used generic engineering terms without focusing on specific Day ${curriculumDay.day} tooling (${(curriculumDay.toolsUsed || []).slice(0, 2).join(", ")}).`);
  }

  // Quantitative & SLA signals
  const quantitativeSignals = ["p99", "p50", "p95", "latency", "sla", "throughput", "qps", "ms", "millisecond", "memory", "ram", "gpu", "token", "chunk size", "overlap", "top_k", "dimension", "quantiz"];
  const hasQuantitative = quantitativeSignals.filter((sig) => fullContent.includes(sig));
  if (hasQuantitative.length >= 2) {
    technicalScore += 14;
    architectureScore += 15;
    strengthsIdentified.push(`Effectively quantified system metrics & latency SLAs (${hasQuantitative.slice(0, 3).join(", ")}).`);
  } else {
    gapsIdentified.push("Needs to explicitly quantify latency SLAs (P99), memory overhead, and throughput trade-offs.");
  }

  // Edge-Case & Failure Mode Analysis
  const edgeCaseSignals = ["fallback", "retry", "circuit breaker", "timeout", "error", "exception", "validation", "failover", "backoff", "rate limit", "dead letter", "out of memory", "oom"];
  const hasEdgeCases = edgeCaseSignals.filter((sig) => fullContent.includes(sig));
  if (hasEdgeCases.length >= 1) {
    edgeCaseScore += 50;
    architectureScore += 10;
    strengthsIdentified.push(`Addressed failure recovery mechanisms (${hasEdgeCases.slice(0, 2).join(", ")}).`);
  } else {
    gapsIdentified.push("Did not outline concrete failure recovery, backoff retries, or circuit-breaking fallbacks.");
  }

  // Code Implementation Quality
  if (code && code.trim().length > 30) {
    technicalScore += 10;
    if (code.includes("try") || code.includes("except") || code.includes("catch") || code.includes("if") || code.includes("async")) {
      edgeCaseScore += 15;
      architectureScore += 6;
      strengthsIdentified.push("Provided structured implementation code with defensive control flow.");
    }
  }

  // Answer Length & Communication Density
  if (words.length > 40) {
    communicationScore += 40;
  } else if (words.length > 20) {
    communicationScore += 25;
  } else {
    gapsIdentified.push("Response was brief; expand on architectural design decisions and reasoning.");
  }

  // Bound scores between 10 and 98
  technicalScore = Math.min(98, Math.max(10, technicalScore));
  architectureScore = Math.min(96, Math.max(10, architectureScore));
  edgeCaseScore = Math.min(95, Math.max(5, edgeCaseScore));
  communicationScore = Math.min(99, Math.max(20, communicationScore));

  const feedback = `${
    strengthsIdentified.length > 0 ? strengthsIdentified[0] : `Addressed fundamentals of Day ${curriculumDay.day} (${curriculumDay.topic}).`
  } ${gapsIdentified.length > 0 ? gapsIdentified[0] : "To reach Staff level, document continuous benchmarking and decoupled asynchronous architectures."}`;

  const idealEngineeringAnswer = `### Staff-Level Architecture for Day ${curriculumDay.day} (${curriculumDay.topic})
1. **Core System Architecture**:
   - Utilize specialized primitives (${(curriculumDay.toolsUsed || ["Standard Tooling"]).join(", ")}) configured for high throughput and sub-50ms P99 latency.
   - Decouple compute from state management using asynchronous event queues.
2. **Failure Modes & Edge Cases**:
   - Wrap remote inference and database queries in circuit breakers with exponential backoff and jitter.
   - Enforce strict JSON Schema validation with deterministic fallbacks upon tool parsing errors.
3. **Observability & SLAs**:
   - Trace end-to-end spans with OpenTelemetry, attributing token costs and memory allocations per tenant.`;

  return {
    technicalScore,
    architectureScore,
    edgeCaseScore,
    communicationScore,
    feedback,
    idealEngineeringAnswer,
    strengthsIdentified,
    gapsIdentified,
    matchedConcepts: uniqueMatched.slice(0, 4)
  };
}

/**
 * Generate intelligent follow-up question dynamically probing candidate's specific answer
 */
async function generateIntelligentFollowUp({
  currentQuestion,
  candidateAnswer,
  candidateCode,
  dayNumber,
  candidate,
  session,
  turnEval
}) {
  const curriculumDay = CURRICULUM_DAYS.find((d) => d.day === dayNumber) || CURRICULUM_DAYS[0];

  // Try LLM Providers
  if (aiConfig.activeProvider === "gemini" && aiConfig.geminiApiKey) {
    try {
      const q = await generateGeminiFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate });
      if (q && isQuestionFresh(q, session)) return q;
    } catch (err) {
      console.warn("Gemini follow-up fallback:", err.message);
    }
  }

  if (aiConfig.activeProvider === "groq" && aiConfig.groqApiKey) {
    try {
      const q = await generateGroqFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate });
      if (q && isQuestionFresh(q, session)) return q;
    } catch (err) {
      console.warn("Groq follow-up fallback:", err.message);
    }
  }

  if (aiConfig.activeProvider === "openai" && aiConfig.openaiApiKey) {
    try {
      const q = await generateOpenAIFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate });
      if (q && isQuestionFresh(q, session)) return q;
    } catch (err) {
      console.warn("OpenAI follow-up fallback:", err.message);
    }
  }

  // Built-in intelligent probe synthesizer
  const answerLower = (candidateAnswer || "").toLowerCase();
  
  // If the answer was junk or low scoring, probe them to give real technical substance
  if (turnEval && turnEval.technicalScore < 30) {
    return `[Adaptive Follow-Up on Day ${dayNumber} - ${curriculumDay.topic}]: Let's be specific. Can you explain the exact technical tools (${(curriculumDay.toolsUsed || []).slice(0, 3).join(", ")}) you configured on this day and the primary challenge you solved?`;
  }

  // Pick an unasked follow-up probe from curriculum
  if (curriculumDay.followUpProbes && curriculumDay.followUpProbes.length > 0) {
    for (const probe of curriculumDay.followUpProbes) {
      const formatted = `[Adaptive Follow-Up on Day ${dayNumber} - ${curriculumDay.topic}]: Based on your response, let's probe deeper into production trade-offs:\n\n${probe}`;
      if (isQuestionFresh(formatted, session)) {
        return formatted;
      }
    }
  }

  // Synthesize dynamic contextual probe
  if (turnEval && turnEval.gapsIdentified && turnEval.gapsIdentified.length > 0) {
    const gap = turnEval.gapsIdentified[0];
    const probe = `[Adaptive Follow-Up on Day ${dayNumber}]: You described your high-level approach, but ${gap.toLowerCase().replace(/^[a-z]/, (c) => c.toLowerCase())} How would you architect this to guarantee 99.9% availability and prevent cascading failures?`;
    if (isQuestionFresh(probe, session)) return probe;
  }

  if (answerLower.includes("cache") || answerLower.includes("index") || answerLower.includes("rag")) {
    return `[Adaptive Follow-Up on Day ${dayNumber} - ${curriculumDay.topic}]: In your architecture, how do you handle cache invalidation and vector index staleness during continuous real-time document updates?`;
  }

  return `[Adaptive Follow-Up on Day ${dayNumber} - ${curriculumDay.topic}]: What are the primary latency bottlenecks (P99 SLA) and memory overheads when scaling this solution to 10 million daily active requests?`;
}

/**
 * Generate challenging milestone question when transitioning to next curriculum day
 */
async function generateNextDayQuestion({ curriculumDay, candidate, session }) {
  if (aiConfig.activeProvider === "gemini" && aiConfig.geminiApiKey) {
    try {
      const q = await generateGeminiDayQuestion({ curriculumDay, candidate });
      if (q && isQuestionFresh(q, session)) return q;
    } catch (err) {
      console.warn("Gemini day question fallback:", err.message);
    }
  }

  if (aiConfig.activeProvider === "groq" && aiConfig.groqApiKey) {
    try {
      const q = await generateGroqDayQuestion({ curriculumDay, candidate });
      if (q && isQuestionFresh(q, session)) return q;
    } catch (err) {
      console.warn("Groq day question fallback:", err.message);
    }
  }

  if (curriculumDay.sampleQuestions && curriculumDay.sampleQuestions.length > 0) {
    for (const sq of curriculumDay.sampleQuestions) {
      const formatted = `Moving forward to Day ${curriculumDay.day} (${curriculumDay.moduleTitle} - ${curriculumDay.topic}):\n\n${sq}`;
      if (isQuestionFresh(formatted, session)) {
        return formatted;
      }
    }
  }

  return `Moving forward to Day ${curriculumDay.day} (${curriculumDay.moduleTitle} - ${curriculumDay.topic}):\n\nWalk me through your architectural implementation for ${curriculumDay.topic} using ${(curriculumDay.toolsUsed || []).slice(0, 3).join(", ")}, and how you handled the most critical production failure modes.`;
}

function isQuestionFresh(questionText, session) {
  if (!session || !session.askedQuestions) return true;
  const normalized = normalizeQuestionText(questionText);
  return !session.askedQuestions.has(normalized);
}

function generateStudyPlan(candidate, overallScore, radarData) {
  const plan = [];
  const sortedModules = [...radarData].sort((a, b) => a.score - b.score);
  const weakestModule = sortedModules[0] || { moduleName: "Evaluation & Deployment", moduleId: 7 };
  const secondWeakest = sortedModules[1] || { moduleName: "Agentic AI & MCP", moduleId: 6 };

  plan.push({
    week: "Week 1: Foundations & Weak Point Hardening",
    focus: weakestModule.moduleName,
    actionItems: [
      `Review cohort missions for Module ${weakestModule.moduleId} (${weakestModule.moduleName}).`,
      "Build a standalone benchmarking sandbox to measure latency SLAs and memory trade-offs.",
      "Implement comprehensive unit tests with deterministic failure recovery."
    ]
  });

  plan.push({
    week: "Week 2: Advanced Architectural Patterns",
    focus: secondWeakest.moduleName,
    actionItems: [
      "Implement a custom FastMCP server with stdio and SSE transport support.",
      "Build a cyclic LangGraph state machine with human-in-the-loop validation.",
      "Deploy token-bucket rate limiting and circuit breakers."
    ]
  });

  plan.push({
    week: "Week 3: Production Serving & Optimization",
    focus: "vLLM, Continuous Batching & Quantization",
    actionItems: [
      "Deploy vLLM with PagedAttention and continuous batching on multi-GPU setups.",
      "Compare AWQ vs FP8 quantization perplexity on target domain benchmarks.",
      "Configure KEDA autoscaling on Kubernetes based on queue depth metrics."
    ]
  });

  plan.push({
    week: "Week 4: Enterprise Capstone & SLA Hardening",
    focus: "End-to-End Observability & Guardrails",
    actionItems: [
      "Instrument OpenTelemetry spans with Langfuse tracing and cost attribution.",
      "Deploy NeMo Guardrails and Microsoft Presidio for real-time PII redaction.",
      "Conduct a full mock architecture defense with lead enterprise interviewers."
    ]
  });

  return plan;
}

// -------------------------------------------------------------
// EXTERNAL LLM PROVIDER IMPLEMENTATIONS (GEMINI, GROQ, OPENAI, OLLAMA)
// -------------------------------------------------------------

async function evaluateWithGemini({ question, answer, code, curriculumDay, candidate }) {
  const modelName = aiConfig.geminiModel || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${aiConfig.geminiApiKey}`;

  const prompt = `You are a strict, world-class Enterprise AI Engineering Technical Interviewer.
You are evaluating a candidate's response for Day ${curriculumDay.day} (${curriculumDay.topic}) of the 31-Day Enterprise AI Cohort.

Question Asked: ${question}
Candidate Answer: ${answer || "(No verbal answer)"}
Candidate Code: ${code || "(No code submitted)"}
Expected Key Concepts: ${(curriculumDay.keyConcepts || []).join(", ")}
Expected Tools: ${(curriculumDay.toolsUsed || []).join(", ")}

CRITICAL EVALUATION & SCORING RULES:
1. STRICT RELEVANCE: Directly check whether the candidate accurately and directly answered the SPECIFIC question asked.
2. JUNK / IRRELEVANT / EVASIVE ANSWERS:
   - If the candidate wrote random characters, gibberish ("asdfgh", "kuch bhi", "hello", "hi"), evasive answers ("I don't know", "skip", "idk"), or off-topic generic text, you MUST ASSIGN SCORES BETWEEN 0 AND 15 for technicalScore, architectureScore, and edgeCaseScore.
   - Set strengthsIdentified to [] and explicitly state in feedback that the response failed to answer the technical question.
3. PARTIAL ANSWERS: If they only mentioned high-level buzzwords without architectural depth or trade-offs, score between 30 and 55.
4. STRONG STAFF-LEVEL ANSWERS: Only award 80-98 if the candidate clearly explains implementation mechanisms, quantitative metrics (latency SLAs, P99, memory footprint), and failure recovery (circuit breakers, retry backoff, schema validation).

Respond strictly in JSON format with keys:
{
  "technicalScore": <number 0-100>,
  "architectureScore": <number 0-100>,
  "edgeCaseScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "feedback": "<concise strict feedback highlighting why this score was given>",
  "strengthsIdentified": ["<specific point 1>"],
  "gapsIdentified": ["<specific missing point 1>"],
  "idealEngineeringAnswer": "<clean markdown of the staff-level answer>"
}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.1 }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned status ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(rawText);
}

async function generateGeminiFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate }) {
  const modelName = aiConfig.geminiModel || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${aiConfig.geminiApiKey}`;

  const prompt = `You are an elite Enterprise AI Technical Interviewer conducting an interview on Day ${curriculumDay.day} (${curriculumDay.topic}).
Question: ${currentQuestion}
Candidate Response: ${candidateAnswer}
Candidate Code: ${candidateCode || "None"}

Generate exactly ONE sharp, challenging follow-up question that probes their architectural trade-offs, edge cases, latency SLAs, or failure modes based on what they just said. Do not include conversational greetings. Return plain text only.`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4 }
    })
  });

  if (!response.ok) throw new Error(`Gemini API error ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  return `[Adaptive Follow-Up - Day ${curriculumDay.day}]: ${text}`;
}

async function generateGeminiDayQuestion({ curriculumDay, candidate }) {
  const modelName = aiConfig.geminiModel || "gemini-1.5-flash";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${aiConfig.geminiApiKey}`;

  const prompt = `You are an elite Enterprise AI Interviewer. The interview is advancing to Day ${curriculumDay.day} (${curriculumDay.moduleTitle} - ${curriculumDay.topic}).
Tools: ${(curriculumDay.toolsUsed || []).join(", ")}
Objectives: ${(curriculumDay.objectives || []).join("; ")}

Generate ONE realistic, milestone interview question asking the candidate how they implemented this module and made critical architectural trade-offs. Return plain question text only.`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3 }
    })
  });

  if (!response.ok) throw new Error(`Gemini API error ${response.status}`);
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  return `Moving forward to Day ${curriculumDay.day} (${curriculumDay.moduleTitle} - ${curriculumDay.topic}):\n\n${text}`;
}

async function evaluateWithGroq({ question, answer, code, curriculumDay, candidate }) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const prompt = `You are a strict Enterprise AI Interviewer evaluating a response for Day ${curriculumDay.day} (${curriculumDay.topic}).
Question: ${question}
Answer: ${answer}
Code: ${code}
Key Concepts: ${(curriculumDay.keyConcepts || []).join(", ")}

STRICT RULES:
- If the answer is irrelevant, gibberish ("hello", "asdf", "kuch bhi"), evasive ("I don't know"), or completely off-topic, ASSIGN 0-15 scores for technicalScore, architectureScore, edgeCaseScore.
- Only award 80+ for rigorous architectural trade-offs, quantitative latency SLAs, and concrete failure handling.

Respond strictly in JSON with keys: technicalScore (0-100), architectureScore (0-100), edgeCaseScore (0-100), communicationScore (0-100), feedback (string), strengthsIdentified (array), gapsIdentified (array), idealEngineeringAnswer (markdown string).`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.groqApiKey}`
    },
    body: JSON.stringify({
      model: aiConfig.groqModel || "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a senior enterprise AI interviewer. Output JSON only." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error(`Groq API returned ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

async function generateGroqFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate }) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.groqApiKey}`
    },
    body: JSON.stringify({
      model: aiConfig.groqModel || "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an elite Enterprise AI Interviewer for Day ${curriculumDay.day} (${curriculumDay.topic}). Generate exactly ONE probing follow-up question challenging latency SLAs, edge cases, or failure modes based on candidate's answer. No conversational fluff.`
        },
        { role: "user", content: `Question: ${currentQuestion}\nAnswer: ${candidateAnswer}\nCode: ${candidateCode}` }
      ]
    })
  });

  if (!response.ok) throw new Error(`Groq API returned ${response.status}`);
  const data = await response.json();
  const text = data.choices[0].message.content.trim();
  return `[Adaptive Follow-Up - Day ${curriculumDay.day}]: ${text}`;
}

async function generateGroqDayQuestion({ curriculumDay, candidate }) {
  const url = "https://api.groq.com/openai/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.groqApiKey}`
    },
    body: JSON.stringify({
      model: aiConfig.groqModel || "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `You are an enterprise AI interviewer. Generate ONE milestone technical question for Day ${curriculumDay.day} (${curriculumDay.topic}) with tools: ${(curriculumDay.toolsUsed || []).join(", ")}. Return only question text.`
        },
        { role: "user", content: "Generate question." }
      ]
    })
  });

  if (!response.ok) throw new Error(`Groq API returned ${response.status}`);
  const data = await response.json();
  const text = data.choices[0].message.content.trim();
  return `Moving forward to Day ${curriculumDay.day} (${curriculumDay.moduleTitle} - ${curriculumDay.topic}):\n\n${text}`;
}

async function evaluateWithOpenAI({ question, answer, code, curriculumDay, candidate }) {
  const url = "https://api.openai.com/v1/chat/completions";
  const prompt = `Evaluate candidate response for Day ${curriculumDay.day} (${curriculumDay.topic}).
Question: ${question}
Answer: ${answer}
Code: ${code}

STRICT RULES:
- If irrelevant, gibberish ("hello", "asdf", "kuch bhi"), or evasive ("I don't know"), score 0-15.
- Only award 80+ for deep architectural trade-offs, quantitative latency SLAs, and failure handling.

Return JSON with technicalScore, architectureScore, edgeCaseScore, communicationScore, feedback, strengthsIdentified, gapsIdentified, idealEngineeringAnswer.`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.openaiApiKey}`
    },
    body: JSON.stringify({
      model: aiConfig.openaiModel || "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an enterprise AI interviewer. Return valid JSON only." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) throw new Error(`OpenAI API returned ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}

async function generateOpenAIFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate }) {
  const url = "https://api.openai.com/v1/chat/completions";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.openaiApiKey}`
    },
    body: JSON.stringify({
      model: aiConfig.openaiModel || "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an elite Enterprise AI Interviewer. Generate ONE sharp follow-up question for Day ${curriculumDay.day} based on the candidate's answer.`
        },
        { role: "user", content: `Question: ${currentQuestion}\nAnswer: ${candidateAnswer}` }
      ]
    })
  });

  if (!response.ok) throw new Error(`OpenAI API returned ${response.status}`);
  const data = await response.json();
  return `[Adaptive Follow-Up - Day ${curriculumDay.day}]: ${data.choices[0].message.content.trim()}`;
}

async function evaluateWithOllama({ question, answer, code, curriculumDay, candidate }) {
  const url = `${aiConfig.ollamaBaseUrl}/api/generate`;
  const prompt = `You are an Enterprise AI Interviewer evaluating Day ${curriculumDay.day} (${curriculumDay.topic}).
Question: ${question}
Answer: ${answer}
Code: ${code}

If irrelevant or gibberish, score 0-15.
Output JSON with keys technicalScore (number), architectureScore (number), edgeCaseScore (number), communicationScore (number), feedback (string), idealEngineeringAnswer (string).`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: aiConfig.ollamaModel || "mistral",
      prompt,
      stream: false,
      format: "json"
    })
  });

  if (!response.ok) throw new Error(`Ollama returned ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.response);
}
