import dbConnect from "../../../db/connect";
import User from "../../../models/User";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token.sub;

  if (!session) {
    return response.status(401).json({ status: "Not authorized" });
  }

  if (request.method === "GET") {
    try {
      const user = await User.findById(userId)
        .populate("favorites")
        .populate("notes.remedyId")
        .populate("reviews.remedyId");
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "POST") {
    try {
      const { favorites, notes, reviews } = request.body;

      const newUser = new User({
        _id: userId,
        favorites,
        notes,
        reviews,
        owner: userId,
      });

      await newUser.save();
      return response.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  } else if (request.method === "PUT") {
    try {
      const { remedyId, rating, comment, favorites, notes } = request.body;

      const user = await User.findById(userId);

      if (remedyId && rating) {
        const newReview = {
          remedyId,
          rating,
          comment,
          createdAt: new Date(),
        };
        user.reviews.push(newReview);
      }

      if (favorites) {
        user.favorites = favorites;
      }

      if (notes) {
        user.notes = notes;
      }

      await user.save();
      return response.status(200).json(user);
    } catch (error) {
      console.error(error);
      return response.status(400).json({ error: error.message });
    }
  } else {
    return response.status(405).json({ status: "Method not allowed" });
  }
}
