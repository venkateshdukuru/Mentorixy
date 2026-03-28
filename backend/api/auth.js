import jwt from "jsonwebtoken";
import { connectDB } from "../lib/db.js";
import User from "../lib/models/User.js";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  await connectDB();
  const { action } = req.query;

  // POST /api/auth?action=register
  if (req.method === "POST" && action === "register") {
    try {
      const { name, email, password, role } = req.body;
      if (!name || !email || !password)
        return res.status(400).json({ error: "Name, email, and password are required" });

      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ error: "Email already registered" });

      const user = await User.create({ name, email, password, role });

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.status(201).json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST /api/auth?action=login
  if (req.method === "POST" && action === "login") {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).json({ error: "Email and password are required" });

      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });

      const valid = await user.comparePassword(password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      return res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // GET /api/auth?action=me
  if (req.method === "GET" && action === "me") {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) return res.status(401).json({ error: "No token provided" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");

      if (!user) return res.status(404).json({ error: "User not found" });

      return res.json({ user });
    } catch (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
  }

  return res.status(404).json({ error: "Endpoint not found" });
}
