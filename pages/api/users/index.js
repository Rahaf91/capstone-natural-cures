import dbConnect from "../../../db/connect";
import User from "../../../db/models/User";
import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const token = await getToken({ req: request });
  const userId = token.sub;

//   if (request.method === "GET") {
//     if (session) {
//       const users = await User.find({ owner: userId });
//       return response.status(200).json(users);
//     } else {
//       const users = await User.find({ owner: "default" });
//       return response.status(200).json(users);
//     }
//   }
// }

// } else if (request.method === "POST") {
//   try {
//       if (session) {
//         const placeData = request.body;
//         await Place.create({ ...placeData, owner: userId });
//         response.status(201).json({ status: "Place created" });
//       } else {
//         response.status(401).json({ status: "Not authorized" });
//       }
//     } catch (error) {
//       console.error(error);
//       response.status(400).json({ error: error.message });
//     }
//   } else {
//     return response.status(405).json({ status: "Method not allowed" });
//   }
