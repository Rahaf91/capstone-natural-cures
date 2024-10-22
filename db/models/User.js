import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Remedy" }],
  notes: [
    {
      remedyId: { type: mongoose.Schema.Types.ObjectId, ref: "Remedy" },
      noteId: { type: String, required: true },
      note: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  reviews: [
    {
      remedyId: { type: mongoose.Schema.Types.ObjectId, ref: "Remedy" },
      rating: { type: Number, required: true },
      comment: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  owner: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
