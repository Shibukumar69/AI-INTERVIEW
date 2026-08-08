// backend/services/interviewAgent.js
// Multi-Turn Adaptive Interview Agent for the 31-Day Enterprise AI Engineering Cohort
import { CURRICULUM_DAYS, CURRICULUM_MODULES } from "../data/curriculum.js";
import { CANDIDATE_PROFILES } from "../data/candidates.js";
import fetch from "node-fetch";

// Active in-memory interview session store
const interviewSessions = new Map();

// Configuration store for API keys and provider selection
export const aiConfig = {
  activeProvider: process.env.AI_PROVIDER || "builtin", // "builtin" | "gemini" | "openai" | "groq" | "ollama"
  geminiApiKey: process.env.GEMINI_API_KEY || "",
  geminiModel: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
  groqApiKey: process.env.GROQ_API_KEY || "",
  groqModel: process.env.GROQ_MODEL || "llama-3.1-70b-versatile",
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
      // Pick 1 day from each of at least 4 modules (e.g. Day 1, Day 7, Day 12, Day 22, Day 28)
      selectedDays = [1, 7, 12, 22, 28];
    }
  }

  // Ensure selected days are unique and sorted
  selectedDays = Array.from(new Set(selectedDays));

  const sessionId = providedSessionId || "session_" + Date.now() + "_" + Math.random().toString(36).substring(2, 8);

  const initialDayNumber = selectedDays[0] || 1;
  const initialCurriculumDay = CURRICULUM_DAYS.find((d) => d.day === initialDayNumber) || CURRICULUM_DAYS[0];

  // Select initial question tailored to candidate
  const initialQuestionText = getInitialQuestionForDay(initialCurriculumDay, candidate);

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
        dayNumber: initialDayNumber,
        isFollowUp: false,
        timestamp: new Date()
      }
    ],
    turnCount: 1,
    minRequiredQuestions: 8,
    minRequiredDays: 4,
    status: "in-progress", // "in-progress" | "completed"
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
  const session = interviewSessions.get(sessionId);
  if (!session) {
    throw new Error(`Interview session '${sessionId}' not found.`);
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

  // Evaluate the candidate's turn
  const turnEval = await evaluateSingleTurn({
    question: currentQ.questionText,
    answer: combinedAnswer,
    code: userCode,
    dayNumber: session.currentDayNumber,
    candidate: session.candidate
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
    // Generate intelligent follow-up question probing deeper into their answer
    isFollowUp = true;
    parentQuestionId = currentQ.questionId;
    session.consecutiveFollowUpsOnCurrentDay += 1;

    nextQuestionText = await generateIntelligentFollowUp({
      currentQuestion: currentQ.questionText,
      candidateAnswer: combinedAnswer,
      candidateCode: userCode,
      dayNumber: session.currentDayNumber,
      candidate: session.candidate,
      conversationHistory: session.conversationHistory
    });
  } else {
    // Transition to the next curriculum day
    session.consecutiveFollowUpsOnCurrentDay = 0;
    session.currentDayIndex += 1;

    // Pick next day from target days or cycle through available 31 days
    if (session.currentDayIndex < session.targetDays.length) {
      nextDayNumber = session.targetDays[session.currentDayIndex];
    } else {
      // Pick another day that hasn't been covered yet
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
      previousAnswers: session.questionHistory
    });
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

  session.conversationHistory.push({
    role: "interviewer",
    text: nextQuestionText,
    dayNumber: nextDayNumber,
    isFollowUp,
    timestamp: new Date()
  });

  return {
    sessionId: session.sessionId,
    turnCount: session.turnCount,
    isFollowUp,
    parentQuestionId,
    currentDayNumber: session.currentDayNumber,
    moduleTitle: nextCurriculumDay.moduleTitle,
    topic: nextCurriculumDay.topic,
    questionText: nextQuestionText,
    coveredDays: session.coveredDays,
    coveredDaysCount: session.coveredDays.length,
    minDaysMet: session.coveredDays.length >= session.minRequiredDays,
    minQuestionsMet: session.questionHistory.length >= session.minRequiredQuestions,
    lastTurnEvaluation: turnEval,
    conversationHistory: session.conversationHistory
  };
}

/**
 * Conclude interview and generate structured diagnostic feedback
 */
export async function finalizeInterviewEvaluation(sessionId) {
  const session = interviewSessions.get(sessionId);
  if (!session) {
    throw new Error(`Interview session '${sessionId}' not found.`);
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

  // Track scores by 7 modules
  const moduleScores = {
    1: { name: "RAG & Document Pipelines", total: 0, count: 0 },
    2: { name: "Vector DBs & High-Scale Indexing", total: 0, count: 0 },
    3: { name: "Prompting & Structured Outputs", total: 0, count: 0 },
    4: { name: "Agentic AI & Autonomous Systems", total: 0, count: 0 },
    5: { name: "Model Context Protocol (MCP)", total: 0, count: 0 },
    6: { name: "AI Deployment & Serving", total: 0, count: 0 },
    7: { name: "Production AI Systems & Guardrails", total: 0, count: 0 }
  };

  evaluatedQuestions.forEach((q) => {
    const e = q.evaluation;
    totalTechScore += e.technicalScore || 0;
    totalArchScore += e.architectureScore || 0;
    totalEdgeScore += e.edgeCaseScore || 0;
    totalCommScore += e.communicationScore || 0;

    const modId = q.moduleNumber || 1;
    if (moduleScores[modId]) {
      moduleScores[modId].total += e.technicalScore || 0;
      moduleScores[modId].count += 1;
    }
  });

  const avgTech = Math.round(totalTechScore / totalQuestions);
  const avgArch = Math.round(totalArchScore / totalQuestions);
  const avgEdge = Math.round(totalEdgeScore / totalQuestions);
  const avgComm = Math.round(totalCommScore / totalQuestions);

  const overallScore = Math.round(avgTech * 0.4 + avgArch * 0.3 + avgEdge * 0.2 + avgComm * 0.1);

  // Determine Enterprise Readiness Grade
  let readinessGrade = "L4 Full-Stack AI Engineer";
  if (overallScore >= 90) {
    readinessGrade = "L6 Staff AI Architect & Systems Lead";
  } else if (overallScore >= 80) {
    readinessGrade = "L5 Senior AI Systems Engineer";
  } else if (overallScore >= 70) {
    readinessGrade = "L4 Enterprise AI Software Engineer";
  } else if (overallScore >= 60) {
    readinessGrade = "L3 Associate AI Engineer";
  } else {
    readinessGrade = "Junior Cohort Apprentice (Needs Reinforcement)";
  }

  // Format module breakdown for Radar / Bar Chart
  const radarChartData = Object.entries(moduleScores).map(([modId, modData]) => {
    const calculatedScore = modData.count > 0 ? Math.round(modData.total / modData.count) : Math.max(60, avgTech - 5);
    return {
      moduleId: parseInt(modId),
      moduleName: modData.name,
      score: calculatedScore,
      questionsAsked: modData.count
    };
  });

  // Extract strengths & critical gaps based on candidate responses and skipped topics
  const candidate = session.candidate;
  const verifiedStrengths = [];
  const criticalGaps = [];

  if (avgTech >= 80) {
    verifiedStrengths.push("Strong fundamental mastery of core AI engineering principles and algorithmic trade-offs.");
  }
  if (avgArch >= 80) {
    verifiedStrengths.push("Clear architectural intuition for system scalability, latency budgets, and cost governance.");
  }
  if (candidate.learningSignals?.strengths) {
    verifiedStrengths.push(...candidate.learningSignals.strengths.slice(0, 2));
  }

  if (candidate.skippedTopics && candidate.skippedTopics.length > 0) {
    criticalGaps.push(`Gaps identified in skipped curriculum missions: ${candidate.skippedTopics.slice(0, 2).map((t) => `Day ${t.day} (${t.topic})`).join(", ")}.`);
  }
  if (avgEdge < 75) {
    criticalGaps.push("Needs deeper edge-case analysis when dealing with unexpected tool failures, network timeouts, and schema validation errors.");
  }
  if (candidate.learningSignals?.vulnerabilities) {
    criticalGaps.push(...candidate.learningSignals.vulnerabilities.slice(0, 2));
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
        technicalScore: 70,
        architectureScore: 70,
        edgeCaseScore: 70,
        communicationScore: 70,
        feedback: "Completed without detailed critique.",
        idealEngineeringAnswer: "Standard enterprise implementation."
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

function getInitialQuestionForDay(curriculumDay, candidate) {
  if (curriculumDay.sampleQuestions && curriculumDay.sampleQuestions.length > 0) {
    // If candidate had attempts on this day, customize question
    const attemptInfo = candidate.attempts?.[curriculumDay.day];
    if (attemptInfo && attemptInfo.count > 1) {
      return `Welcome ${candidate.name}. In Day ${curriculumDay.day} (${curriculumDay.topic}), you worked extensively on this module with ${attemptInfo.count} iteration attempts. Can you explain the core architectural challenges you encountered and how you optimized your final implementation?`;
    }
    return curriculumDay.sampleQuestions[0];
  }
  return `Explain the core engineering concepts and trade-offs you implemented in Day ${curriculumDay.day} (${curriculumDay.topic}).`;
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
  // If we already reached max follow-ups on this day, transition
  if (consecutiveFollowUps >= maxFollowUps) {
    return false;
  }

  // If we still need to cover more curriculum days to meet the minimum 4 days constraint,
  // and we haven't covered 4 days yet, favor day transitions
  if (coveredDaysCount < minRequiredDays && totalQuestions >= 6 && consecutiveFollowUps >= 1) {
    return false;
  }

  // If candidate gave a good response with interesting technical claims, probe deeper with follow-up
  if (turnEval && turnEval.technicalScore >= 60 && consecutiveFollowUps < 2) {
    return true;
  }

  // If candidate struggled or gave a brief answer, give 1 follow-up probe to elaborate
  if (consecutiveFollowUps === 0) {
    return true;
  }

  return false;
}

async function evaluateSingleTurn({ question, answer, code, dayNumber, candidate }) {
  const curriculumDay = CURRICULUM_DAYS.find((d) => d.day === dayNumber) || CURRICULUM_DAYS[0];

  // Try calling configured external LLM provider if available
  if (aiConfig.activeProvider === "gemini" && aiConfig.geminiApiKey) {
    try {
      return await evaluateWithGemini({ question, answer, code, curriculumDay, candidate });
    } catch (err) {
      console.warn("Gemini evaluation fallback to built-in engine:", err.message);
    }
  } else if (aiConfig.activeProvider === "openai" && aiConfig.openaiApiKey) {
    try {
      return await evaluateWithOpenAI({ question, answer, code, curriculumDay, candidate });
    } catch (err) {
      console.warn("OpenAI evaluation fallback to built-in engine:", err.message);
    }
  }

  // Built-in High-Quality Intelligent Enterprise Evaluation Engine
  return evaluateWithBuiltinEngine({ question, answer, code, curriculumDay, candidate });
}

function evaluateWithBuiltinEngine({ question, answer, code, curriculumDay, candidate }) {
  const text = (answer || "").toLowerCase();
  const codeText = (code || "").toLowerCase();
  const allContent = text + " " + codeText;

  let technicalScore = 75;
  let architectureScore = 75;
  let edgeCaseScore = 70;
  let communicationScore = 80;

  // Check key concepts matching
  let matchedConcepts = 0;
  curriculumDay.keyConcepts.forEach((concept) => {
    if (allContent.includes(concept.toLowerCase().replace(/[^a-z0-9]/g, " "))) {
      matchedConcepts += 1;
    }
  });

  if (matchedConcepts >= 3) {
    technicalScore += 15;
    architectureScore += 12;
  } else if (matchedConcepts >= 1) {
    technicalScore += 8;
  } else if (allContent.length < 50) {
    technicalScore = Math.max(30, technicalScore - 35);
    communicationScore = Math.max(40, communicationScore - 30);
  }

  // Check code presence
  if (code && code.trim().length > 30) {
    technicalScore = Math.min(98, technicalScore + 8);
    architectureScore = Math.min(95, architectureScore + 6);
  }

  // Bound scores between 10 and 99
  technicalScore = Math.min(98, Math.max(20, technicalScore));
  architectureScore = Math.min(96, Math.max(25, architectureScore));
  edgeCaseScore = Math.min(94, Math.max(20, edgeCaseScore));
  communicationScore = Math.min(99, Math.max(30, communicationScore));

  const feedback = `Good discussion of ${curriculumDay.topic}. You accurately addressed ${
    matchedConcepts > 0 ? "key curriculum concepts including " + curriculumDay.keyConcepts.slice(0, 2).join(", ") : "the high-level mechanics"
  }. To elevate this to staff-level engineering, explicitly quantify latency SLAs (P99), memory footprints, and fallback strategies.`;

  const idealEngineeringAnswer = `For ${curriculumDay.topic} (Day ${curriculumDay.day}), an optimal enterprise architecture balances recall precision with latency SLAs. In production:
1. Architectural Design: Decouple compute-heavy operations using specialized primitives (${curriculumDay.toolsUsed.join(", ")}).
2. Failure Modes: Handle edge cases through circuit breakers, backoff retries, and strict schema validation.
3. Observability: Instrument OpenTelemetry spans to track P99 latency and token attribution per request.`;

  return {
    technicalScore,
    architectureScore,
    edgeCaseScore,
    communicationScore,
    feedback,
    idealEngineeringAnswer,
    matchedConcepts: curriculumDay.keyConcepts.slice(0, Math.max(1, matchedConcepts))
  };
}

async function generateIntelligentFollowUp({
  currentQuestion,
  candidateAnswer,
  candidateCode,
  dayNumber,
  candidate,
  conversationHistory
}) {
  const curriculumDay = CURRICULUM_DAYS.find((d) => d.day === dayNumber) || CURRICULUM_DAYS[0];

  // Try external LLM if configured
  if (aiConfig.activeProvider === "gemini" && aiConfig.geminiApiKey) {
    try {
      return await generateGeminiFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate });
    } catch (err) {
      console.warn("Gemini follow-up generation fallback:", err.message);
    }
  }

  // Built-in intelligent follow-up selector with contextual probing
  if (curriculumDay.followUpProbes && curriculumDay.followUpProbes.length > 0) {
    const probeIndex = Math.floor(Math.random() * curriculumDay.followUpProbes.length);
    return `[Follow-Up on Day ${dayNumber} - ${curriculumDay.topic}]: Based on your response, let's probe deeper into the trade-offs:\n\n${curriculumDay.followUpProbes[probeIndex]}`;
  }

  return `[Follow-Up on Day ${dayNumber}]: You mentioned key architectural choices in your response. How do you quantify the latency and cost trade-offs of this approach when scaling to 10 million daily active requests?`;
}

async function generateNextDayQuestion({ curriculumDay, candidate, previousAnswers }) {
  if (curriculumDay.sampleQuestions && curriculumDay.sampleQuestions.length > 0) {
    const qIndex = (previousAnswers.length) % curriculumDay.sampleQuestions.length;
    return `Moving forward to Day ${curriculumDay.day} (${curriculumDay.moduleTitle} - ${curriculumDay.topic}):\n\n${curriculumDay.sampleQuestions[qIndex]}`;
  }
  return `Let's discuss Day ${curriculumDay.day} (${curriculumDay.topic}). Walk me through how you implemented this in your cohort project and the critical design decisions you made.`;
}

function generateStudyPlan(candidate, overallScore, radarData) {
  const plan = [];

  // Identify lowest scoring module
  const sortedModules = [...radarData].sort((a, b) => a.score - b.score);
  const weakestModule = sortedModules[0] || { moduleName: "AI Deployment", moduleId: 6 };

  plan.push({
    week: "Week 1: Foundations & Weak Point Hardening",
    focus: weakestModule.moduleName,
    actionItems: [
      `Review cohort missions for Module ${weakestModule.moduleId}.`,
      "Build a standalone benchmarking sandbox to measure latency and memory trade-offs.",
      "Implement comprehensive unit and integration tests."
    ]
  });

  plan.push({
    week: "Week 2: Advanced Architectural Patterns",
    focus: "Multi-Agent & Model Context Protocol (MCP)",
    actionItems: [
      "Implement a custom FastMCP server with stdio and SSE transport support.",
      "Build a cyclic LangGraph state machine with human-in-the-loop validation.",
      "Deploy token-bucket rate limiting and circuit breakers."
    ]
  });

  plan.push({
    week: "Week 3: Production Serving & Optimization",
    focus: "vLLM, Speculative Decoding & Quantization",
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
// EXTERNAL LLM PROVIDER ADAPTERS (GEMINI / OPENAI)
// -------------------------------------------------------------

async function evaluateWithGemini({ question, answer, code, curriculumDay, candidate }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.geminiModel}:generateContent?key=${aiConfig.geminiApiKey}`;
  const prompt = `You are a strict Enterprise AI Engineering Interviewer evaluating a candidate's technical response for Day ${curriculumDay.day} (${curriculumDay.topic}) of the 31-Day Enterprise AI Cohort.
Question: ${question}
Candidate Answer: ${answer || "None"}
Candidate Code: ${code || "None"}
Key Concepts: ${curriculumDay.keyConcepts.join(", ")}

Respond strictly in JSON:
{
  "technicalScore": <number 0-100>,
  "architectureScore": <number 0-100>,
  "edgeCaseScore": <number 0-100>,
  "communicationScore": <number 0-100>,
  "feedback": "<concise actionable critique>",
  "idealEngineeringAnswer": "<clean markdown of the staff-level answer>"
}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json", temperature: 0.2 }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API returned ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(rawText);
}

async function generateGeminiFollowUp({ currentQuestion, candidateAnswer, candidateCode, curriculumDay, candidate }) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.geminiModel}:generateContent?key=${aiConfig.geminiApiKey}`;
  const prompt = `You are an elite Enterprise AI Engineering Technical Interviewer.
The candidate is answering a question on Day ${curriculumDay.day} (${curriculumDay.topic}).
Question: ${currentQuestion}
Candidate Response: ${candidateAnswer}
Candidate Code: ${candidateCode || "None"}

Generate exactly ONE probing, realistic follow-up question that challenges their architectural trade-offs, edge cases, latency SLAs, or failure modes based on what they just said. Do not include introductory conversational fluff.`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4 }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error ${response.status}`);
  }

  const data = await response.json();
  const questionText = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "";
  return `[Intelligent Follow-Up - Day ${curriculumDay.day}]: ${questionText}`;
}

async function evaluateWithOpenAI({ question, answer, code, curriculumDay, candidate }) {
  const url = "https://api.openai.com/v1/chat/completions";
  const prompt = `Evaluate this response for Day ${curriculumDay.day} (${curriculumDay.topic}). Return JSON with technicalScore, architectureScore, edgeCaseScore, communicationScore, feedback, idealEngineeringAnswer.`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${aiConfig.openaiApiKey}`
    },
    body: JSON.stringify({
      model: aiConfig.openaiModel,
      messages: [
        { role: "system", content: "You are an enterprise AI interviewer. Return valid JSON only." },
        { role: "user", content: `Question: ${question}\nAnswer: ${answer}\nCode: ${code}\n${prompt}` }
      ],
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API returned ${response.status}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}
