// backend/test_strict_eval.js
import { initializeInterviewSession, processInterviewChat } from "./services/interviewAgent.js";

async function testStrictEvaluation() {
  console.log("==================================================");
  console.log("🧪 TESTING STRICT AI ANSWER EVALUATION");
  console.log("==================================================\n");

  const session = initializeInterviewSession({ candidateId: "candidate-1" });
  console.log(`Initial Question (Day ${session.currentDayNumber}):\n${session.questionHistory[0].questionText}\n`);

  // Test Case 1: Pure Gibberish / Random Characters
  console.log("1️⃣ Test Case 1: Gibberish ('asdfghjkl qwerty zxcv')");
  const res1 = await processInterviewChat({
    sessionId: session.sessionId,
    userAnswerText: "asdfghjkl qwerty zxcv"
  });
  console.log(`   Scores: Tech ${res1.lastTurnEvaluation.technicalScore}%, Arch ${res1.lastTurnEvaluation.architectureScore}%, Edge ${res1.lastTurnEvaluation.edgeCaseScore}%`);
  console.log(`   Feedback: ${res1.lastTurnEvaluation.feedback}`);
  if (res1.lastTurnEvaluation.technicalScore > 20) {
    throw new Error(`❌ Test 1 Failed: Gibberish received high score of ${res1.lastTurnEvaluation.technicalScore}%`);
  }
  console.log("   ✅ PASSED: Accurately assigned near-zero score to gibberish.\n");

  // Test Case 2: Evasive / Low Effort ("kuch bhi answer likh raha hu mujhe nahi pata")
  console.log("2️⃣ Test Case 2: Evasive / Low Effort ('kuch bhi answer likh raha hu mujhe nahi pata')");
  const res2 = await processInterviewChat({
    sessionId: session.sessionId,
    userAnswerText: "kuch bhi answer likh raha hu mujhe nahi pata"
  });
  console.log(`   Scores: Tech ${res2.lastTurnEvaluation.technicalScore}%, Arch ${res2.lastTurnEvaluation.architectureScore}%, Edge ${res2.lastTurnEvaluation.edgeCaseScore}%`);
  console.log(`   Feedback: ${res2.lastTurnEvaluation.feedback}`);
  if (res2.lastTurnEvaluation.technicalScore > 20) {
    throw new Error(`❌ Test 2 Failed: Evasive answer received high score of ${res2.lastTurnEvaluation.technicalScore}%`);
  }
  console.log("   ✅ PASSED: Accurately assigned near-zero score to evasive answer.\n");

  // Test Case 3: Short Greeting ("hello hi")
  console.log("3️⃣ Test Case 3: Short Greeting ('hello interviewer')");
  const res3 = await processInterviewChat({
    sessionId: session.sessionId,
    userAnswerText: "hello interviewer"
  });
  console.log(`   Scores: Tech ${res3.lastTurnEvaluation.technicalScore}%, Arch ${res3.lastTurnEvaluation.architectureScore}%, Edge ${res3.lastTurnEvaluation.edgeCaseScore}%`);
  console.log(`   Feedback: ${res3.lastTurnEvaluation.feedback}`);
  if (res3.lastTurnEvaluation.technicalScore > 20) {
    throw new Error(`❌ Test 3 Failed: Greeting received high score of ${res3.lastTurnEvaluation.technicalScore}%`);
  }
  console.log("   ✅ PASSED: Accurately assigned low score to greeting.\n");

  // Test Case 4: High Quality Enterprise AI Answer
  console.log("4️⃣ Test Case 4: Deep Technical AI Answer (Dense HNSW + BM25 + P99 SLA + Circuit Breakers)");
  const res4 = await processInterviewChat({
    sessionId: session.sessionId,
    userAnswerText: "For Day 7 embeddings and hybrid search, we combined dense Sentence Transformers with BM25 sparse index using reciprocal rank fusion. To satisfy a sub-20ms P99 latency SLA under 10k QPS, we quantized vectors using Product Quantization (IVF-PQ) and wrapped inference calls in exponential backoff retries with circuit breaker fallback to avoid cascading database timeouts.",
    userCode: "def retrieve(query):\n    try:\n        return hybrid_index.search(query, top_k=10, timeout_ms=20)\n    except TimeoutError:\n        return fallback_cache.get(query)"
  });
  console.log(`   Scores: Tech ${res4.lastTurnEvaluation.technicalScore}%, Arch ${res4.lastTurnEvaluation.architectureScore}%, Edge ${res4.lastTurnEvaluation.edgeCaseScore}%, Comm ${res4.lastTurnEvaluation.communicationScore}%`);
  console.log(`   Feedback: ${res4.lastTurnEvaluation.feedback}`);
  console.log(`   Strengths: ${res4.lastTurnEvaluation.strengthsIdentified.join("; ")}`);
  if (res4.lastTurnEvaluation.technicalScore < 80) {
    throw new Error(`❌ Test 4 Failed: Deep technical answer received low score of ${res4.lastTurnEvaluation.technicalScore}%`);
  }
  console.log("   ✅ PASSED: Accurately assigned high score to deep engineering answer.\n");

  console.log("==================================================");
  console.log("🎉 ALL STRICT EVALUATION TESTS PASSED PERFECTLY!");
  console.log("==================================================");
}

testStrictEvaluation().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
