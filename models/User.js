import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  username: { type: String },
  image: { type: String },
  favorites: { type: [String], default: [] },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
