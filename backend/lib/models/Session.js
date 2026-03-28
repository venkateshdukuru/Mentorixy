import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    expertId: { type: String, required: true },
    expertName: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, enum: ["hourly", "half-day", "full-day"], required: true },
    price: { type: Number, required: true },
    topic: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    meetLink: { type: String, default: "" },
    notes: { type: String, default: "" },
    paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.models.Session || mongoose.model("Session", SessionSchema);
