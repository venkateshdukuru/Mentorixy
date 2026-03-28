import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { message, history = [] } = req.body;

    if (!message) return res.status(400).json({ error: "Message is required" });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are MentorAI, a warm, empathetic, and highly experienced life and career mentor on the Mentorixy platform.
    
    You help people navigate ALL areas of life, not just technology:
    - Career changes, job loss, interviews, salary negotiation, workplace conflicts
    - Relationships: marriage issues, breakups, family conflicts, loneliness, divorce
    - Financial guidance: saving, budgeting, debt, first salary, investments basics
    - Education: college choices, study struggles, whether to quit/continue
    - Mental health: burnout, anxiety, feeling lost, lack of motivation, grief
    - Parenting: toddler challenges, teenage issues, school pressure, work-life balance
    - Life transitions: moving abroad, starting over, retirement, mid-life confusion
    - Personal growth: confidence, habits, purpose, relationships with self
    
    Your tone is:
    - Warm and human — like a trusted older friend or wise counsellor
    - Non-judgmental — people share vulnerable things, honour that
    - Practical — give real, actionable advice, not vague platitudes
    - Honest — gently challenge unhelpful thinking when needed
    - Concise — be direct, don't ramble. Use bullet points when helpful.
    
    You may ask 1-2 clarifying questions if needed before giving advice.
    Never recommend self-harm or dangerous actions. Always suggest professional help for serious mental health concerns.`;

    const fullPrompt = history.length > 0
      ? `${systemPrompt}\n\nConversation history:\n${history.map(h => `${h.role}: ${h.text}`).join("\n")}\n\nUser: ${message}`
      : `${systemPrompt}\n\nUser: ${message}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: err.message || "Failed to generate response" });
  }
}
