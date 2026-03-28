import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  expertId: String,
  expertName: String,
  content: String,
  isAI: { type: Boolean, default: false },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const QuestionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["Career", "Education", "Tech", "Life", "Business", "Other"],
      default: "Other",
    },
    authorId: { type: String, required: true },
    authorName: { type: String, required: true },
    tags: [String],
    answers: [AnswerSchema],
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["open", "answered", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);
