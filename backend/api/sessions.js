import jwt from "jsonwebtoken";
import { connectDB } from "../lib/db.js";
import Session from "../lib/models/Session.js";

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
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  await connectDB();
  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: "Authentication required" });

  // GET user's sessions
  if (req.method === "GET") {
    const sessions = await Session.find({ userId: user.userId }).sort({ date: -1 });
    return res.json({ sessions });
  }

  // POST book a session
  if (req.method === "POST") {
    const { expertId, expertName, date, duration, price, topic } = req.body;
    if (!expertId || !date || !duration || !price || !topic)
      return res.status(400).json({ error: "All session fields are required" });

    const session = await Session.create({
      userId: user.userId,
      userName: user.email.split("@")[0],
      expertId,
      expertName,
      date: new Date(date),
      duration,
      price,
      topic,
    });

    return res.status(201).json(session);
  }

  // PUT update session status
  if (req.method === "PUT") {
    const { sessionId, status, meetLink } = req.body;
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { status, meetLink },
      { new: true }
    );
    return res.json(session);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
