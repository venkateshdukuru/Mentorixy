import { connectDB } from "../lib/db.js";
import Expert from "../lib/models/Expert.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  await connectDB();
  const { id } = req.query;

  // GET all experts
  if (req.method === "GET" && !id) {
    const { skill, search, page = 1, limit = 12 } = req.query;
    const filter = { isActive: true };
    if (skill) filter.skills = { $in: [skill] };
    if (search) filter.$text = { $search: search };

    const experts = await Expert.find(filter)
      .sort({ rating: -1, totalSessions: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Expert.countDocuments(filter);
    return res.json({ experts, total });
  }

  // GET single expert
  if (req.method === "GET" && id) {
    const expert = await Expert.findById(id);
    if (!expert) return res.status(404).json({ error: "Expert not found" });
    return res.json(expert);
  }

  // POST create expert profile (seed / self-registration)
  if (req.method === "POST") {
    try {
      const expert = await Expert.create(req.body);
      return res.status(201).json(expert);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
