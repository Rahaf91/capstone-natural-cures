import mongoose from "mongoose";

const { Schema } = mongoose;
const remedySchema = new Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  symptoms: { type: [String], required: true },
  imageUrl: { type: String },
  preparation: { type: String },
  usage: { type: String },
  videoUrlPreparation: { type: String },
  category: { type: String },
  reviewsIds: { type: [String], required: true },
  // createdAt: { type: Date, default: Date.now },
});

const Remedy = mongoose.models.Remedy || mongoose.model("Remedy", remedySchema);

export default Remedy;
