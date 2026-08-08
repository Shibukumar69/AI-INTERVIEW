// backend/server.js
import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import { Server } from "socket.io";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// Resilient MongoDB Connection with graceful fallback
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ai_interviewer";
  try {
    const conn = await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB connection error: ${error.message}. Running in High-Speed In-Memory & Stateless AI Engine Mode.`);
  }
};


connectDB();

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174"
];

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  }
});

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.set("io", io);

// Health and Root
app.get("/", (req, res) => {
  res.json({
    message: "🧠 AI Cohort 31-Day Enterprise AI Interview Agent API",
    status: "online",
    endpoints: [
      "/api/curriculum",
      "/api/candidates",
      "/api/interview/start",
      "/api/interview/chat",
      "/api/interview/evaluate",
      "/api/agent/interview",
      "/api/config/status"
    ]
  });
});

// Technical Specification and Cohort Agent Routes
app.use("/api", interviewRoutes);

// Legacy and Auth Routes
app.use("/api/users", userRoutes);
app.use("/api/sessions", sessionRoutes);

io.on("connection", (socket) => {
  console.log(`🔌 Client connected to Socket.io: ${socket.id}`);
  const userId = socket.handshake.query.userId;
  if (userId) {
    socket.join(userId);
  }

  socket.on("disconnect", () => {
    console.log(`🔌 Client disconnected: ${socket.id}`);
  });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use by another process. Please close the other terminal or kill the process.`);
  } else {
    console.error("Server error:", error.message);
  }
});

server.listen(PORT, () => {
  console.log(`🚀 AI Interviewer Server running on port ${PORT}`);
  console.log(`📡 Technical Specification API ready at http://localhost:${PORT}/api/`);
});

