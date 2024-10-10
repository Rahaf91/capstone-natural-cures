import dbConnect from "@/db/connect";
import Remedy from "@/db/models/Remedy";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const remedy = await Remedy.findById(id);

      if (!remedy) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(remedy);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error retrieving remedy: " + error.message });
    }
  }
  if (request.method === "PUT") {
    const remedyData = request.body;

    if (!remedyData) {
      return response.status(400).json({ error: "Missing remedy data" });
    }

    try {
      const updatedRemedy = await Remedy.findByIdAndUpdate(id, remedyData, {
        new: true,
        runValidators: true,
      });

      if (!updatedRemedy) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedRemedy);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error updating remedy: " + error.message });
    }
  }

  if (request.method === "PUT") {
    const { isFavorite } = request.body;

    if (typeof isFavorite !== "boolean") {
      return response.status(400).json({ error: "Invalid favorite status" });
    }

    try {
      const updatedRemedy = await Remedy.findByIdAndUpdate(
        id,
        { isFavorite },
        {
          new: true,
          runValidators: true,
        }
      );

      if (!updatedRemedy) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedRemedy);
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Error updating remedy: " + error.message });
    }
  }

  if (request.method === "DELETE") {
    try {
      await Remedy.findByIdAndDelete(id);
      return response.status(200).json({ message: "Success!" });
    } catch (error) {
      return response
        .status(400)
        .json({ error: "Error deleting remedy: " + error.message });
    }
  }
}
