// backend/test_simulation.js
import { initializeInterviewSession, processInterviewChat, finalizeInterviewEvaluation } from "./services/interviewAgent.js";

async function testSimulation() {
  console.log("🚀 Running 8-Turn Dynamic Interview Simulation...");
  const session = initializeInterviewSession({ candidateId: "candidate-1" });
  console.log(`Initial Question (Day ${session.currentDayNumber}):\n${session.questionHistory[0].questionText}\n`);

  const answers = [
    "We configured Python virtual environment with Pylance strict type checking to catch type mismatch errors before deployment.",
    "For hybrid search, we combined dense HNSW embeddings with BM25 sparse vectors, setting M=32 and efSearch=128 to achieve 98% recall within a 15ms P99 latency SLA.",
    "When memory constrained, we used Product Quantization (IVF-PQ) to compress 1536-dimensional embeddings into 64-byte codes, reducing RAM footprint by 75%.",
    "In our ReAct agent loop, we used LangGraph to maintain cyclic state graphs and implemented exponential backoff retries with circuit breakers to prevent infinite execution loops.",
    "For tool schema validation, we enforced Pydantic strict schemas and added a fallback recovery path when downstream MCP tools returned invalid arguments.",
    "We deployed vLLM with PagedAttention and continuous batching, which reduced KV cache memory fragmentation and increased throughput to 240 req/sec.",
    "To govern model drift, we instrumented OpenTelemetry spans in Langfuse with automated alerts on P99 latency anomalies and token usage spikes.",
    "For enterprise security, we integrated NeMo Guardrails and Presidio to redact PII before embeddings generation and LLM context injection."
  ];

  const questionsAsked = [];
  questionsAsked.push(session.questionHistory[0].questionText);

  for (let i = 0; i < answers.length; i++) {
    console.log(`--- Turn ${i + 1} Candidate Answer: "${answers[i].substring(0, 60)}..." ---`);
    const turnResult = await processInterviewChat({
      sessionId: session.sessionId,
      userAnswerText: answers[i]
    });

    console.log(`-> Turn ${turnResult.turnCount} [Day ${turnResult.currentDayNumber}] (IsFollowUp: ${turnResult.isFollowUp}):`);
    console.log(`   Evaluation: Tech ${turnResult.lastTurnEvaluation.technicalScore}%, Arch ${turnResult.lastTurnEvaluation.architectureScore}%, Edge ${turnResult.lastTurnEvaluation.edgeCaseScore}%`);
    console.log(`   Feedback: ${turnResult.lastTurnEvaluation.feedback}`);
    console.log(`   Next Question: ${turnResult.questionText}\n`);

    if (questionsAsked.includes(turnResult.questionText)) {
      throw new Error(`❌ DUPLICATE QUESTION DETECTED: "${turnResult.questionText}"`);
    }
    questionsAsked.push(turnResult.questionText);
  }

  const report = await finalizeInterviewEvaluation(session.sessionId);
  console.log("==========================================");
  console.log(`🏆 Final Evaluation Completed!`);
  console.log(`Overall Score: ${report.overallScore}% | Grade: ${report.readinessGrade}`);
  console.log(`Total Questions: ${report.requirementsVerification.totalQuestions}`);
  console.log(`Covered Days: ${report.requirementsVerification.coveredDays.join(", ")}`);
  console.log(`Strengths Count: ${report.strengths.length}`);
  console.log(`Gaps Count: ${report.criticalGaps.length}`);
  console.log("==========================================");
  console.log("✅ Simulation Passed with 0 Duplicate Questions!");
}

testSimulation().catch((err) => {
  console.error("Simulation failed:", err);
  process.exit(1);
});
