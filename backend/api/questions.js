import jwt from "jsonwebtoken";
import { connectDB } from "../lib/db.js";
import Question from "../lib/models/Question.js";

function verifyToken(req) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    return jwt.verify(auth.split(" ")[1], process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  await connectDB();

  const { id } = req.query;

  // GET all questions
  if (req.method === "GET" && !id) {
    const { category, status, search, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (search) filter.$text = { $search: search };

    const questions = await Question.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Question.countDocuments(filter);
    return res.json({ questions, total, page: parseInt(page) });
  }

  // GET single question
  if (req.method === "GET" && id) {
    const question = await Question.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!question) return res.status(404).json({ error: "Question not found" });
    return res.json(question);
  }

  // POST create question
  if (req.method === "POST" && !id) {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    const { title, description, category, tags } = req.body;
    if (!title || !description) return res.status(400).json({ error: "Title and description required" });

    const question = await Question.create({
      title,
      description,
      category: category || "Other",
      tags: tags || [],
      authorId: user.userId,
      authorName: user.email.split("@")[0],
    });

    return res.status(201).json(question);
  }

  // POST add answer
  if (req.method === "POST" && req.query.action === "answer" && id) {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: "Authentication required" });

    const { content, isAI, expertName } = req.body;
    const question = await Question.findByIdAndUpdate(
      id,
      {
        $push: {
          answers: {
            expertId: user.userId,
            expertName: expertName || user.email.split("@")[0],
            content,
            isAI: isAI || false,
          },
        },
        $set: { status: "answered" },
      },
      { new: true }
    );
    return res.json(question);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
