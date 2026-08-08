// backend/controllers/interviewController.js
import asyncHandler from "express-async-handler";
import { CURRICULUM_DAYS, CURRICULUM_MODULES } from "../data/curriculum.js";
import { CANDIDATE_PROFILES } from "../data/candidates.js";
import {
  initializeInterviewSession,
  processInterviewChat,
  finalizeInterviewEvaluation,
  getInterviewSession,
  getAllInterviewSessions,
  aiConfig
} from "../services/interviewAgent.js";

// @desc    Get the entire 31-Day Curriculum
// @route   GET /api/curriculum
// @access  Public
export const getCurriculum = asyncHandler(async (req, res) => {
  res.json({
    totalDays: CURRICULUM_DAYS.length,
    totalModules: CURRICULUM_MODULES.length,
    modules: CURRICULUM_MODULES,
    days: CURRICULUM_DAYS
  });
});

// @desc    Get specific curriculum day
// @route   GET /api/curriculum/:day
// @access  Public
export const getCurriculumDay = asyncHandler(async (req, res) => {
  const dayNum = parseInt(req.params.day, 10);
  const dayData = CURRICULUM_DAYS.find((d) => d.day === dayNum);

  if (!dayData) {
    res.status(404);
    throw new Error(`Curriculum day ${dayNum} not found.`);
  }

  res.json(dayData);
});

// @desc    Get all candidate profiles
// @route   GET /api/candidates
// @access  Public
export const getCandidates = asyncHandler(async (req, res) => {
  res.json({
    totalCandidates: CANDIDATE_PROFILES.length,
    candidates: CANDIDATE_PROFILES
  });
});

// @desc    Get candidate profile by ID
// @route   GET /api/candidates/:id
// @access  Public
export const getCandidateById = asyncHandler(async (req, res) => {
  const candidate = CANDIDATE_PROFILES.find((c) => c.id === req.params.id);

  if (!candidate) {
    res.status(404);
    throw new Error(`Candidate '${req.params.id}' not found.`);
  }

  res.json(candidate);
});

// @desc    Create / Onboard a new candidate profile
// @route   POST /api/candidates
// @access  Public
export const createCandidate = asyncHandler(async (req, res) => {
  const {
    name,
    cohortTrack,
    experienceLevel,
    targetRole,
    summary,
    completedMissions,
    skippedTopics,
    strengths,
    vulnerabilities,
    avatar
  } = req.body;

  if (!name || !cohortTrack) {
    res.status(400);
    throw new Error("Candidate name and cohort track are required.");
  }

  const newId = `candidate-${CANDIDATE_PROFILES.length + 1}`;
  const newCandidate = {
    id: newId,
    name,
    email: `${name.toLowerCase().replace(/[^a-z0-9]/g, "")}@enterprise-ai.io`,
    avatar: avatar || `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
    cohortTrack: cohortTrack || "Enterprise AI Systems Engineer",
    experienceLevel: experienceLevel || "Senior (4+ yrs)",
    targetRole: targetRole || "AI Infrastructure Engineer",
    summary: summary || `Cohort graduate specialized in ${cohortTrack}.`,
    completedMissions: Array.isArray(completedMissions) && completedMissions.length > 0 ? completedMissions : [1, 2, 3, 6, 7, 10, 12, 15, 20, 24, 28],
    totalMissionsCompleted: Array.isArray(completedMissions) ? completedMissions.length : 11,
    skippedTopics: Array.isArray(skippedTopics) ? skippedTopics : [],
    attempts: {
      1: { count: 1, avgScore: 90, status: "Mastered" },
      6: { count: 2, avgScore: 88, status: "Completed" },
      15: { count: 1, avgScore: 92, status: "Mastered" },
      24: { count: 1, avgScore: 89, status: "Completed" }
    },
    learningSignals: {
      strengths: Array.isArray(strengths) && strengths.length > 0 ? strengths : ["Demonstrates high proficiency in modular AI systems."],
      vulnerabilities: Array.isArray(vulnerabilities) && vulnerabilities.length > 0 ? vulnerabilities : ["Needs probing on distributed edge cases."],
      codeHabits: "Writes clean, modular Python and TypeScript code.",
      velocity: "Strong, consistent cohort progress."
    },
    recommendedProbeDays: [1, 6, 15, 24]
  };

  CANDIDATE_PROFILES.unshift(newCandidate);

  res.status(201).json({
    message: "New candidate profile onboarded successfully.",
    candidate: newCandidate
  });
});


// @desc    Start personalized technical interview
// @route   POST /api/interview/start
// @access  Public
export const startInterview = asyncHandler(async (req, res) => {
  const { candidateId, targetDays, customInstructions, mode } = req.body;

  const session = initializeInterviewSession({
    candidateId: candidateId || "candidate-1",
    targetDays: targetDays || null,
    customInstructions: customInstructions || "",
    mode: mode || "adaptive"
  });

  res.status(201).json({
    message: "Personalized interview initialized successfully.",
    sessionId: session.sessionId,
    candidate: session.candidate,
    initialQuestion: session.questionHistory[0],
    currentDayNumber: session.currentDayNumber,
    coveredDays: session.coveredDays,
    minRequiredQuestions: session.minRequiredQuestions,
    minRequiredDays: session.minRequiredDays,
    status: session.status
  });
});

// @desc    Technical Specification Unified Endpoint (POST /api/interview)
// @route   POST /api/interview
// @access  Public
export const handleTechnicalSpecInterview = asyncHandler(async (req, res) => {
  const { sessionId, candidate, message, finish } = req.body;

  if (!sessionId) {
    res.status(400);
    throw new Error("Session ID is required.");
  }

  // 1. START INTERVIEW: If candidate object or start flag is provided
  if (candidate || (!message && !finish)) {
    const candId = candidate?.member?.id?.toLowerCase() || candidate?.id || "cand-001";
    const session = initializeInterviewSession({
      sessionId,
      candidateId: candId,
      customCandidate: candidate
    });

    return res.json({
      reply: session.conversationHistory[0]?.text || `Welcome! Let's begin your technical interview for the AI Cohort.`,
      done: false
    });
  }

  // 2. END / FINISH INTERVIEW: If finish is requested
  if (finish) {
    const report = await finalizeInterviewEvaluation(sessionId);
    return res.json({
      reply: "Interview completed. Structured feedback generated.",
      done: true,
      feedback: {
        summary: `${report.readinessGrade}. Overall Score: ${report.overallScore}%. ${report.strengths?.[0] || ""}`,
        strengths: report.strengths || ["Strong foundational execution in AI systems."],
        gaps: report.criticalGaps || ["Needs deeper edge case analysis."],
        next: (report.personalizedStudyPlan || []).map((p) => `${p.week}: ${p.focus} (${p.actionItems?.[0] || ""})`)
      }
    });
  }

  // 3. CONVERSATION TURN: Candidate answers a question
  const session = getInterviewSession(sessionId);
  if (!session) {
    // Graceful auto-initialization if session wasn't found
    const newSession = initializeInterviewSession({ candidateId: "cand-001" });
    newSession.sessionId = sessionId;
  }

  const turnResult = await processInterviewChat({
    sessionId,
    userAnswerText: message || ""
  });

  // Check if interview completed (e.g. 8+ questions and covered 4+ days)
  const currentSession = getInterviewSession(sessionId);
  if (currentSession && currentSession.questionHistory.length >= 8 && currentSession.coveredDays.length >= 4) {
    const report = await finalizeInterviewEvaluation(sessionId);
    return res.json({
      reply: `Thank you. That concludes our technical interview.\n\n${turnResult.questionText || ""}`,
      done: true,
      feedback: {
        summary: `${report.readinessGrade}. Overall Score: ${report.overallScore}%. ${report.strengths?.[0] || ""}`,
        strengths: report.strengths || ["High proficiency in core AI systems."],
        gaps: report.criticalGaps || ["Needs deeper edge case and latency analysis."],
        next: (report.personalizedStudyPlan || []).map((p) => `${p.week}: ${p.focus}`)
      }
    });
  }

  // Ongoing conversation turn
  res.json({
    reply: turnResult.questionText,
    done: false
  });
});

// @desc    Multi-turn conversational response & adaptive follow-up generation
// @route   POST /api/interview/chat
// @access  Public
export const chatTurn = asyncHandler(async (req, res) => {
  const { sessionId, userAnswerText, userCode, audioTranscription } = req.body;

  if (!sessionId) {
    res.status(400);
    throw new Error("Session ID is required for multi-turn interview chat.");
  }

  const result = await processInterviewChat({
    sessionId,
    userAnswerText: userAnswerText || "",
    userCode: userCode || "",
    audioTranscription: audioTranscription || ""
  });

  res.json({
    message: result.isFollowUp ? "Follow-up question generated." : "Transitioned to next curriculum day.",
    ...result
  });
});

// @desc    Conclude interview and generate structured evaluation report
// @route   POST /api/interview/evaluate
// @access  Public
export const evaluateInterview = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    res.status(400);
    throw new Error("Session ID is required to generate final evaluation.");
  }

  const report = await finalizeInterviewEvaluation(sessionId);
  res.json({
    message: "Structured technical evaluation report generated successfully.",
    report
  });
});

// @desc    Get interview session state
// @route   GET /api/interview/:sessionId
// @access  Public
export const getSessionState = asyncHandler(async (req, res) => {
  const session = getInterviewSession(req.params.sessionId);

  if (!session) {
    res.status(404);
    throw new Error(`Interview session '${req.params.sessionId}' not found.`);
  }

  res.json(session);
});

// @desc    Get final evaluation report for a session
// @route   GET /api/interview/:sessionId/report
// @access  Public
export const getSessionReport = asyncHandler(async (req, res) => {
  const session = getInterviewSession(req.params.sessionId);

  if (!session) {
    res.status(404);
    throw new Error(`Interview session '${req.params.sessionId}' not found.`);
  }

  if (session.evaluationReport) {
    return res.json(session.evaluationReport);
  }

  // If not yet finalized, finalize it now
  const report = await finalizeInterviewEvaluation(session.sessionId);
  res.json(report);
});

// @desc    List all recent interview sessions
// @route   GET /api/interview
// @access  Public
export const listAllSessions = asyncHandler(async (req, res) => {
  const sessions = getAllInterviewSessions();
  res.json({
    totalSessions: sessions.length,
    sessions
  });
});

// @desc    Technical Specification All-in-One Runner / Benchmark Endpoint
// @route   POST /api/agent/interview
// @access  Public
export const technicalSpecRunner = asyncHandler(async (req, res) => {
  const { candidateId, simulateTurns, answers } = req.body;

  // Initialize session
  const session = initializeInterviewSession({
    candidateId: candidateId || "candidate-1"
  });

  const turnsToRun = Math.max(8, simulateTurns || 8);
  const turnsLog = [];

  // Default rich engineering answers for simulation if not provided
  const sampleAnswers = answers || [
    "In Day 1, we implemented recursive character text splitting with 512 token chunks and 10% overlap to preserve sentence boundaries while avoiding context fragmentation in RAG pipelines.",
    "For financial 10-K tables, we used layout-aware markdown extraction with Unstructured.io to avoid slicing tabular data across token boundaries.",
    "In Day 6, we configured HNSW graph indexes in Qdrant with M=32 and efConstruction=200 to achieve 98% top-k recall with sub-15ms search latency.",
    "When memory constrained, we combined IVF with Product Quantization (IVF-PQ) to compress 1536-dimensional vectors into 64-byte quantized codes.",
    "In Day 15, we implemented a ReAct autonomous decision loop with LangGraph, where the agent captures tool execution traces and reflects before emitting the final answer.",
    "To prevent infinite loops, we enforced a max iteration limit of 6 steps and implemented fallback routing when tool schemas returned validation errors.",
    "In Day 24, we deployed vLLM with PagedAttention to eliminate KV cache memory fragmentation, achieving 6x throughput over static batching.",
    "For Day 28 production observability, we instrumented OpenTelemetry spans to trace every retrieval and LLM call with parent-child correlation IDs in Langfuse."
  ];

  for (let i = 0; i < turnsToRun; i++) {
    const answerText = sampleAnswers[i % sampleAnswers.length];
    const turnResult = await processInterviewChat({
      sessionId: session.sessionId,
      userAnswerText: answerText,
      userCode: i % 3 === 0 ? "def optimize_rag(query):\n    vectors = embed(query)\n    return index.search(vectors, k=10)" : ""
    });
    turnsLog.push(turnResult);
  }

  // Finalize evaluation
  const report = await finalizeInterviewEvaluation(session.sessionId);

  res.json({
    status: "success",
    specRequirementsMet: {
      minimumQuestionsAsked: session.questionHistory.length >= 8,
      minimumCurriculumDaysCovered: session.coveredDays.length >= 4,
      totalQuestions: session.questionHistory.length,
      coveredDays: session.coveredDays,
      coveredDaysCount: session.coveredDays.length,
      adaptiveFollowUpsGenerated: session.questionHistory.filter((q) => q.isFollowUp).length
    },
    sessionId: session.sessionId,
    candidate: session.candidate,
    report,
    simulationTurns: turnsLog
  });
});

// @desc    Get current AI Configuration status
// @route   GET /api/config/status
// @access  Public
export const getConfigStatus = asyncHandler(async (req, res) => {
  res.json({
    activeProvider: aiConfig.activeProvider,
    geminiConfigured: Boolean(aiConfig.geminiApiKey),
    openaiConfigured: Boolean(aiConfig.openaiApiKey),
    groqConfigured: Boolean(aiConfig.groqApiKey),
    ollamaConfigured: Boolean(aiConfig.ollamaBaseUrl),
    ollamaModel: aiConfig.ollamaModel,
    geminiModel: aiConfig.geminiModel,
    openaiModel: aiConfig.openaiModel,
    groqModel: aiConfig.groqModel
  });
});

// @desc    Update AI Configuration dynamically
// @route   POST /api/config/update
// @access  Public
export const updateConfig = asyncHandler(async (req, res) => {
  const { provider, geminiApiKey, openaiApiKey, groqApiKey, ollamaBaseUrl, ollamaModel } = req.body;

  if (provider) aiConfig.activeProvider = provider;
  if (geminiApiKey !== undefined) aiConfig.geminiApiKey = geminiApiKey;
  if (openaiApiKey !== undefined) aiConfig.openaiApiKey = openaiApiKey;
  if (groqApiKey !== undefined) aiConfig.groqApiKey = groqApiKey;
  if (ollamaBaseUrl !== undefined) aiConfig.ollamaBaseUrl = ollamaBaseUrl;
  if (ollamaModel !== undefined) aiConfig.ollamaModel = ollamaModel;

  res.json({
    message: "AI configuration updated successfully.",
    activeProvider: aiConfig.activeProvider,
    geminiConfigured: Boolean(aiConfig.geminiApiKey),
    openaiConfigured: Boolean(aiConfig.openaiApiKey),
    groqConfigured: Boolean(aiConfig.groqApiKey)
  });
});
