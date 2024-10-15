import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String },
  image: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
