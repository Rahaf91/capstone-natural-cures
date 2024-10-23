import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });

  //const userId = token.sub;

  // if (!session) {
  //   return response.status(401).json({ status: "Not authorized" });
  // }

  if (request.method === "GET") {
    try {
      if (!token) {
        return response.status(200).json({ status: "No user" });
      } else {
        const userId = token.sub;
        const user = await User.findById(userId)
          .populate("favorites")
          .populate("notes.remedyId")
          .populate("reviews.remedyId");

        return response.status(200).json(user);
      }
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
    console.log("PUT");
    try {
      console.log("request.body", request.body);
      const { remedyId, rating, comment, favorites, notes } = request.body;

      console.log("remedyId", remedyId);
      console.log("rating", rating);
      console.log("comment", comment);
      console.log("favorites", favorites);
      console.log("notes", notes);

      const userId = token.sub;
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
