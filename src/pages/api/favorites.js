import dbConnect from "../lib/connect";
import User from "../../../models/User";

export default async function handler(req, res) {
  const { method } = req;
  const { userId, matchId } = req.body;

  await dbConnect();

  if (method === "PATCH") {
    try {
      if (!userId || !matchId) {
        return res
          .status(400)
          .json({ error: "User ID and Match ID are required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (!user.favorites.includes(matchId)) {
        user.favorites.push(matchId);
        await user.save();
      }

      return res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
      console.error("Error updating favorites:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (method === "DELETE") {
    try {
      if (!userId || !matchId) {
        return res
          .status(400)
          .json({ error: "User ID and Match ID are required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.favorites = user.favorites.filter(id => id !== matchId);
      await user.save();

      return res.status(200).json({ success: true, favorites: user.favorites });
    } catch (error) {
      console.error("Error deleting favorite:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PATCH", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
