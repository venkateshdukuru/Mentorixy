import "dotenv/config";
import express from "express";
import cors from "cors";

// Import route handlers
import authHandler from "./auth.js";
import chatHandler from "./chat.js";
import expertsHandler from "./experts.js";
import questionsHandler from "./questions.js";
import sessionsHandler from "./sessions.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Mount handlers — wrap them so express req/res works with the Vercel-style handlers
app.all("/api/auth", (req, res) => authHandler(req, res));
app.all("/api/chat", (req, res) => chatHandler(req, res));
app.all("/api/experts", (req, res) => expertsHandler(req, res));
app.all("/api/questions", (req, res) => questionsHandler(req, res));
app.all("/api/sessions", (req, res) => sessionsHandler(req, res));

// Health check
app.get("/", (req, res) => res.json({ status: "Mentorixy Backend running ✅" }));

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
