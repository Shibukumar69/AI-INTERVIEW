// backend/test_all_apis.js
import http from "http";
import express from "express";
import cors from "cors";
import interviewRoutes from "./routes/interviewRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

async function runApiTests() {
  console.log("=================================================");
  console.log("🧪 STARTING COMPREHENSIVE API INTEGRATION TESTS");
  console.log("=================================================\n");

  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Root endpoint
  app.get("/", (req, res) => {
    res.json({
      name: "AETHER COHORT // Autonomous Technical Interview Agent",
      status: "online",
      endpoints: [
        "/api/curriculum",
        "/api/candidates",
        "/api/interview/start",
        "/api/interview/chat",
        "/api/interview/evaluate",
        "/api/agent/interview",
        "/api/config/status",
        "/api/health"
      ]
    });
  });

  app.use("/api", interviewRoutes);
  app.use(notFound);
  app.use(errorHandler);

  const PORT = 5055;
  const server = app.listen(PORT);
  const BASE = `http://127.0.0.1:${PORT}`;

  const results = [];

  async function testEndpoint(name, url, options = {}) {
    const start = Date.now();
    try {
      const response = await fetch(url, options);
      const elapsed = Date.now() - start;
      const data = await response.json();
      const status = response.status;
      return { name, status, ok: response.ok, data, elapsed, error: null };
    } catch (err) {
      const elapsed = Date.now() - start;
      return { name, status: 500, ok: false, data: null, elapsed, error: err.message };
    }
  }

  let createdSessionId = null;

  try {
    // 1. Root Endpoint
    console.log("1️⃣ Testing Root GET / ...");
    const resRoot = await testEndpoint("GET /", `${BASE}/`);
    results.push({
      test: "Root Endpoint (GET /)",
      passed: resRoot.status === 200 && resRoot.data.status === "online",
      status: resRoot.status,
      latency: `${resRoot.elapsed}ms`,
      details: `Endpoints exposed: ${resRoot.data?.endpoints?.length || 0}`
    });

    // 2. Health Endpoint
    console.log("2️⃣ Testing GET /api/health ...");
    const resHealth = await testEndpoint("GET /api/health", `${BASE}/api/health`);
    results.push({
      test: "Health Check (GET /api/health)",
      passed: resHealth.status === 200 && resHealth.data.status === "healthy",
      status: resHealth.status,
      latency: `${resHealth.elapsed}ms`,
      details: resHealth.data?.service
    });

    // 3. Curriculum - All Days
    console.log("3️⃣ Testing GET /api/curriculum ...");
    const resCurriculum = await testEndpoint("GET /api/curriculum", `${BASE}/api/curriculum`);
    results.push({
      test: "Curriculum All Days (GET /api/curriculum)",
      passed: resCurriculum.status === 200 && resCurriculum.data.totalDays === 31 && resCurriculum.data.totalModules === 8,
      status: resCurriculum.status,
      latency: `${resCurriculum.elapsed}ms`,
      details: `Total Days: ${resCurriculum.data?.totalDays}, Total Modules: ${resCurriculum.data?.totalModules}`
    });

    // 4. Curriculum - Single Day
    console.log("4️⃣ Testing GET /api/curriculum/1 ...");
    const resDay1 = await testEndpoint("GET /api/curriculum/1", `${BASE}/api/curriculum/1`);
    results.push({
      test: "Curriculum Day 1 (GET /api/curriculum/1)",
      passed: resDay1.status === 200 && resDay1.data.day === 1 && resDay1.data.objectives?.length > 0,
      status: resDay1.status,
      latency: `${resDay1.elapsed}ms`,
      details: `Topic: ${resDay1.data?.topic}`
    });

    // 5. Curriculum - Invalid Day (404 Test)
    console.log("5️⃣ Testing GET /api/curriculum/999 (404 expected) ...");
    const resDayInvalid = await testEndpoint("GET /api/curriculum/999", `${BASE}/api/curriculum/999`);
    results.push({
      test: "Curriculum Day 404 Handling (GET /api/curriculum/999)",
      passed: resDayInvalid.status === 404,
      status: resDayInvalid.status,
      latency: `${resDayInvalid.elapsed}ms`,
      details: `Error message: ${resDayInvalid.data?.message}`
    });

    // 6. Candidates - List All
    console.log("6️⃣ Testing GET /api/candidates ...");
    const resCandidates = await testEndpoint("GET /api/candidates", `${BASE}/api/candidates`);
    results.push({
      test: "Candidates List (GET /api/candidates)",
      passed: resCandidates.status === 200 && resCandidates.data.totalCandidates >= 5,
      status: resCandidates.status,
      latency: `${resCandidates.elapsed}ms`,
      details: `Candidates found: ${resCandidates.data?.totalCandidates}`
    });

    // 7. Candidates - Get By ID
    console.log("7️⃣ Testing GET /api/candidates/cand-001 ...");
    const resCand1 = await testEndpoint("GET /api/candidates/cand-001", `${BASE}/api/candidates/cand-001`);
    results.push({
      test: "Candidate Details (GET /api/candidates/cand-001)",
      passed: resCand1.status === 200 && resCand1.data.name === "Sarah Johnson",
      status: resCand1.status,
      latency: `${resCand1.elapsed}ms`,
      details: `Name: ${resCand1.data?.name}, Role: ${resCand1.data?.targetRole}`
    });

    // 8. Candidates - Create New Profile (POST /api/candidates)
    console.log("8️⃣ Testing POST /api/candidates ...");
    const newCandPayload = {
      name: "Aman Sharma",
      cohortTrack: "Autonomous Systems & Agentic AI",
      experienceLevel: "Senior AI Engineer (5+ yrs)",
      targetRole: "Staff AI Architect",
      summary: "Expert in LangGraph multi-agent loops and vLLM serving optimization.",
      completedMissions: [1, 2, 6, 10, 15, 20, 24, 28],
      strengths: ["High proficiency in distributed vector search and LangGraph loops."],
      vulnerabilities: ["Needs tuning on latency SLA limits."]
    };
    const resCreateCand = await testEndpoint("POST /api/candidates", `${BASE}/api/candidates`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCandPayload)
    });
    results.push({
      test: "Create Candidate Profile (POST /api/candidates)",
      passed: resCreateCand.status === 201 && resCreateCand.data.candidate?.name === "Aman Sharma",
      status: resCreateCand.status,
      latency: `${resCreateCand.elapsed}ms`,
      details: `Created ID: ${resCreateCand.data?.candidate?.id}`
    });

    // 9. Interview - Start Session (POST /api/interview/start)
    console.log("9️⃣ Testing POST /api/interview/start ...");
    const startPayload = {
      candidateId: "candidate-1",
      targetDays: [1, 6, 15, 24, 28],
      mode: "adaptive"
    };
    const resStart = await testEndpoint("POST /api/interview/start", `${BASE}/api/interview/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(startPayload)
    });
    createdSessionId = resStart.data?.sessionId;
    results.push({
      test: "Start Interview Session (POST /api/interview/start)",
      passed: resStart.status === 201 && !!createdSessionId && !!resStart.data?.initialQuestion,
      status: resStart.status,
      latency: `${resStart.elapsed}ms`,
      details: `Session ID: ${createdSessionId}, Day: ${resStart.data?.currentDayNumber}`
    });

    // 10. Interview - Chat Turn 1 (POST /api/interview/chat)
    console.log("🔟 Testing POST /api/interview/chat (Turn 1) ...");
    const chatPayload1 = {
      sessionId: createdSessionId,
      userAnswerText: "In Day 1, we implemented recursive character chunking with 512 token windows and 10% overlap to preserve semantic context.",
      userCode: "def chunk_docs(text):\n    splitter = RecursiveCharacterTextSplitter(chunk_size=512, chunk_overlap=50)\n    return splitter.split_text(text)"
    };
    const resChat1 = await testEndpoint("POST /api/interview/chat", `${BASE}/api/interview/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatPayload1)
    });
    results.push({
      test: "Interview Multi-Turn Chat (POST /api/interview/chat - Turn 1)",
      passed: resChat1.status === 200 && !!resChat1.data?.questionText && typeof resChat1.data?.isFollowUp === "boolean",
      status: resChat1.status,
      latency: `${resChat1.elapsed}ms`,
      details: `Turn: ${resChat1.data?.turnCount}, IsFollowUp: ${resChat1.data?.isFollowUp}, Score: ${resChat1.data?.lastTurnEvaluation?.technicalScore}`
    });

    // 11. Interview - Chat Turn 2 (POST /api/interview/chat)
    console.log("1️⃣1️⃣ Testing POST /api/interview/chat (Turn 2) ...");
    const chatPayload2 = {
      sessionId: createdSessionId,
      userAnswerText: "To mitigate context loss on financial tables, we used Unstructured layout-aware extraction with table HTML preservation.",
      userCode: "elements = partition_pdf(filename=file_path, strategy='hi_res', infer_table_structure=True)"
    };
    const resChat2 = await testEndpoint("POST /api/interview/chat", `${BASE}/api/interview/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(chatPayload2)
    });
    results.push({
      test: "Interview Multi-Turn Chat (POST /api/interview/chat - Turn 2)",
      passed: resChat2.status === 200 && !!resChat2.data?.questionText,
      status: resChat2.status,
      latency: `${resChat2.elapsed}ms`,
      details: `Turn: ${resChat2.data?.turnCount}, Next Day: ${resChat2.data?.currentDayNumber}`
    });

    // 12. Interview - Conclude & Evaluate (POST /api/interview/evaluate)
    console.log("1️⃣2️⃣ Testing POST /api/interview/evaluate ...");
    const resEval = await testEndpoint("POST /api/interview/evaluate", `${BASE}/api/interview/evaluate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: createdSessionId })
    });
    results.push({
      test: "Conclude & Evaluate Interview (POST /api/interview/evaluate)",
      passed: resEval.status === 200 && typeof resEval.data?.report?.overallScore === "number" && !!resEval.data?.report?.readinessGrade,
      status: resEval.status,
      latency: `${resEval.elapsed}ms`,
      details: `Overall Score: ${resEval.data?.report?.overallScore}%, Grade: ${resEval.data?.report?.readinessGrade}`
    });

    // 13. Interview - List All Sessions (GET /api/interview)
    console.log("1️⃣3️⃣ Testing GET /api/interview ...");
    const resSessions = await testEndpoint("GET /api/interview", `${BASE}/api/interview`);
    results.push({
      test: "List All Sessions (GET /api/interview)",
      passed: resSessions.status === 200 && resSessions.data?.totalSessions >= 1,
      status: resSessions.status,
      latency: `${resSessions.elapsed}ms`,
      details: `Total sessions in memory: ${resSessions.data?.totalSessions}`
    });

    // 14. Interview - Get Session State (GET /api/interview/:sessionId)
    console.log(`1️⃣4️⃣ Testing GET /api/interview/${createdSessionId} ...`);
    const resGetSession = await testEndpoint("GET /api/interview/:sessionId", `${BASE}/api/interview/${createdSessionId}`);
    results.push({
      test: "Get Session State (GET /api/interview/:sessionId)",
      passed: resGetSession.status === 200 && resGetSession.data?.sessionId === createdSessionId,
      status: resGetSession.status,
      latency: `${resGetSession.elapsed}ms`,
      details: `Status: ${resGetSession.data?.status}, Turns: ${resGetSession.data?.turnCount}`
    });

    // 15. Interview - Get Final Evaluation Report (GET /api/interview/:sessionId/report)
    console.log(`1️⃣5️⃣ Testing GET /api/interview/${createdSessionId}/report ...`);
    const resGetReport = await testEndpoint("GET /api/interview/:sessionId/report", `${BASE}/api/interview/${createdSessionId}/report`);
    results.push({
      test: "Get Session Report (GET /api/interview/:sessionId/report)",
      passed: resGetReport.status === 200 && typeof resGetReport.data?.overallScore === "number",
      status: resGetReport.status,
      latency: `${resGetReport.elapsed}ms`,
      details: `Radar Modules: ${resGetReport.data?.radarChartData?.length || 0}, Study Plan Items: ${resGetReport.data?.personalizedStudyPlan?.length || 0}`
    });

    // 16. Official Technical Spec Endpoint Flow (POST /api/interview)
    console.log("1️⃣6️⃣ Testing Official Technical Specification Flow (POST /api/interview) ...");
    const testSpecSessionId = "session_spec_test_" + Date.now();
    const specStartRes = await testEndpoint("POST /api/interview (Start)", `${BASE}/api/interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: testSpecSessionId,
        candidate: resCand1.data
      })
    });
    const specTurnRes = await testEndpoint("POST /api/interview (Turn)", `${BASE}/api/interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: testSpecSessionId,
        message: "In Day 7, we converted healthcare documents into Sentence Transformer embeddings with ChromaDB cosine similarity."
      })
    });
    const specFinishRes = await testEndpoint("POST /api/interview (Finish)", `${BASE}/api/interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: testSpecSessionId,
        finish: true
      })
    });

    results.push({
      test: "Technical Spec Contract (POST /api/interview - Start, Turn & Feedback)",
      passed: specStartRes.status === 200 && specStartRes.data?.done === false &&
              specTurnRes.status === 200 && specTurnRes.data?.done === false &&
              specFinishRes.status === 200 && specFinishRes.data?.done === true &&
              Array.isArray(specFinishRes.data?.feedback?.strengths) &&
              Array.isArray(specFinishRes.data?.feedback?.gaps) &&
              Array.isArray(specFinishRes.data?.feedback?.next),
      status: specFinishRes.status,
      latency: `${specFinishRes.elapsed}ms`,
      details: `Strengths: ${specFinishRes.data?.feedback?.strengths?.length}, Gaps: ${specFinishRes.data?.feedback?.gaps?.length}, Next: ${specFinishRes.data?.feedback?.next?.length}`
    });

    // 17. Technical Specification All-in-One Benchmark Runner (POST /api/agent/interview)
    console.log("1️⃣7️⃣ Testing POST /api/agent/interview (Benchmark Runner) ...");
    const resBenchmark = await testEndpoint("POST /api/agent/interview", `${BASE}/api/agent/interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        candidateId: "cand-001",
        simulateTurns: 8
      })
    });
    const spec = resBenchmark.data?.specRequirementsMet;
    results.push({
      test: "Technical Spec Benchmark Runner (POST /api/agent/interview)",
      passed: resBenchmark.status === 200 && spec?.minimumQuestionsAsked === true && spec?.minimumCurriculumDaysCovered === true,
      status: resBenchmark.status,
      latency: `${resBenchmark.elapsed}ms`,
      details: `Questions: ${spec?.totalQuestions}, Covered Days: ${spec?.coveredDays?.join(",")}, Follow-ups: ${spec?.adaptiveFollowUpsGenerated}`
    });

    // 17. AI Config Status (GET /api/config/status)
    console.log("1️⃣7️⃣ Testing GET /api/config/status ...");
    const resConfig = await testEndpoint("GET /api/config/status", `${BASE}/api/config/status`);
    results.push({
      test: "AI Configuration Status (GET /api/config/status)",
      passed: resConfig.status === 200 && !!resConfig.data?.activeProvider,
      status: resConfig.status,
      latency: `${resConfig.elapsed}ms`,
      details: `Active Provider: ${resConfig.data?.activeProvider}`
    });

    // 18. AI Config Update (POST /api/config/update)
    console.log("1️⃣8️⃣ Testing POST /api/config/update ...");
    const resConfigUpdate = await testEndpoint("POST /api/config/update", `${BASE}/api/config/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider: "builtin",
        ollamaModel: "mistral:latest"
      })
    });
    results.push({
      test: "AI Configuration Update (POST /api/config/update)",
      passed: resConfigUpdate.status === 200 && resConfigUpdate.data?.activeProvider === "builtin",
      status: resConfigUpdate.status,
      latency: `${resConfigUpdate.elapsed}ms`,
      details: `Provider confirmed: ${resConfigUpdate.data?.activeProvider}`
    });

  } finally {
    server.close();
  }

  console.log("\n=================================================");
  console.log("📊 API TEST RESULTS SUMMARY");
  console.log("=================================================");
  
  let allPassed = true;
  for (const r of results) {
    const icon = r.passed ? "✅ PASS" : "❌ FAIL";
    if (!r.passed) allPassed = false;
    console.log(`${icon} [${r.status}] ${r.test} (${r.latency}) -> ${r.details}`);
  }

  console.log("=================================================");
  console.log(allPassed ? "🎉 ALL 18 API TESTS PASSED PERFECTLY!" : "⚠️ SOME TESTS FAILED.");
  console.log("=================================================\n");

  if (!allPassed) process.exit(1);
}

runApiTests();
