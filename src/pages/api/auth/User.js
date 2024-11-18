import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  image: String,
  favoriteTeams: [String], 
  favoriteLeagues: [String], 
  favoriteMatches: [String], 
});


export default mongoose.models.User || mongoose.model("User", UserSchema);