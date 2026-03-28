import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});

const ExpertSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
    title: { type: String, required: true },
    bio: { type: String, required: true },
    skills: [String],
    hourlyRate: { type: Number, required: true },
    halfDayRate: Number,
    fullDayRate: Number,
    availability: [
      {
        day: String,
        slots: [String],
      },
    ],
    reviews: [ReviewSchema],
    rating: { type: Number, default: 0 },
    totalSessions: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    linkedin: String,
    github: String,
    website: String,
  },
  { timestamps: true }
);

export default mongoose.models.Expert || mongoose.model("Expert", ExpertSchema);
