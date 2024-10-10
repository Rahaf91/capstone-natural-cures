import dbConnect from "@/db/connect";
import Remedy from "@/db/models/Remedy";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const remedies = await Remedy.find().sort({ createdAt: -1 });

      return response.status(200).json(remedies);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error fetching remedies: " + error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const remedyData = request.body;

      await Remedy.create(remedyData);

      return response.status(201).json({ status: "remedy created" });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error creating remedy: " + error.message });
    }
  }
}
