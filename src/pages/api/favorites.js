import dbConnect from "../lib/connect";
import User from "../../../models/User";
import Favorite from "../../../models/Favorite";
import { response } from "express";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const { method } = req;
  const { userId, matchId } = req.body;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const {userId:userIdParam} = req.query;
        const favorites = await Favorite.find({userId:new ObjectId(userIdParam)});
        console.log({favorites, userIdParam});
        
        res.status(200).json({ favorites });
      } catch (error) {
        console.log(error);
        
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    case "PATCH":
      try {
        if (!userId || !matchId) {
          return res.status(400).json({ error: "User ID and Match ID are required" });
        }

        const favorite = await Favorite.findOne({ userId, matchId });
        if (!favorite) {
          await Favorite.create({ userId, matchId });
        }

        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    case "DELETE":
      try {
        if (!userId || !matchId) {
          return res.status(400).json({ error: "User ID and Match ID are required" });
        }

        await Favorite.deleteOne({ userId, matchId });
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
