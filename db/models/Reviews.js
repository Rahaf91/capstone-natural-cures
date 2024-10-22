import mongoose from "mongoose";

const { Schema } = mongoose;
const reviewSchema = new Schema({
  // remedyId: { type: String, required: true },
  // userId: { type: String, required: true },

  remedyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Remedy",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  rating: { type: Number, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Reviews =
  mongoose.models.Reviews || mongoose.model("Reviews", reviewSchema);

export default Reviews;
