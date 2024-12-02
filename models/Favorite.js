import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  matchId: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Favorite || mongoose.model("Favorite", FavoriteSchema); 