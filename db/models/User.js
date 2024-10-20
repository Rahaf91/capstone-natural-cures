// HINWEIS ANDREA
// {
//     "_id": "ObjectId",  // MongoDB ID
//     "username": "string",
//     "email": "string",
//     "favorites": ["ObjectId"],  // Array von Remedy-IDs, die der Benutzer favorisiert hat
//     "notes": [
//       {
//         "remedyId": "ObjectId",
//         "noteId": "string",  // Eindeutige ID der Notiz
//         "note": "string",
//         "createdAt": "Date"
//       }
//     ],
//   }

import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Remedy" }],
  notes: [
    {
      remedyId: { type: mongoose.Schema.Types.ObjectId, ref: "Remedy" },
      noteId: { type: String, required: true },
      note: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  owner: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
