// backend/routes/interviewRoutes.js
import express from "express";
import {
  getCurriculum,
  getCurriculumDay,
  getCandidates,
  getCandidateById,
  startInterview,
  chatTurn,
  evaluateInterview,
  getSessionState,
  getSessionReport,
  listAllSessions,
  technicalSpecRunner,
  getConfigStatus,
  updateConfig
} from "../controllers/interviewController.js";

const router = express.Router();

// Curriculum Endpoints
router.get("/curriculum", getCurriculum);
router.get("/curriculum/:day", getCurriculumDay);

// Candidate Profiles Endpoints
router.get("/candidates", getCandidates);
router.get("/candidates/:id", getCandidateById);

// Interview Lifecycle Endpoints
router.post("/interview/start", startInterview);
router.post("/interview/chat", chatTurn);
router.post("/interview/respond", chatTurn); // Alias
router.post("/interview/next-question", chatTurn); // Alias
router.post("/interview/evaluate", evaluateInterview);
router.post("/interview/finish", evaluateInterview); // Alias
router.get("/interview", listAllSessions);
router.get("/interview/:sessionId", getSessionState);
router.get("/interview/:sessionId/report", getSessionReport);

// Technical Specification Benchmark Runner
router.post("/agent/interview", technicalSpecRunner);

// AI Configuration & Health
router.get("/config/status", getConfigStatus);
router.post("/config/update", updateConfig);
router.get("/health", (req, res) => {
  res.json({ status: "healthy", service: "Enterprise AI Interview Agent Engine", timestamp: new Date() });
});

export default router;
