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
  isFavorite: { type: Boolean, default: false },
  notes: [
    {
      text: { type: String, required: true },
      timestamp: { type: Date, default: new Date().toLocaleString() },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Remedy = mongoose.models.Remedy || mongoose.model("Remedy", remedySchema);

export default Remedy;
