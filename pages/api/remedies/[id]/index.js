import dbConnect from "@/db/connect";
import Remedy from "@/db/models/Remedy";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    try {
      const remedy = await Remedy.findById(id);

      if (!remedy) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(remedy);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error retrieving remedy: " + error.message });
      return;
    }
  }
  if (request.method === "PUT") {
    const remedyData = request.body;

    if (!remedyData) {
      response.status(400).json({ error: "Missing remedy data" });
      return;
    }

    try {
      const updatedRemedy = await Remedy.findByIdAndUpdate(id, remedyData, {
        new: true,
      });

      if (!updatedRemedy) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(updatedRemedy);
      return;
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error updating remedy: " + error.message });
      return;
    }
  }

  // if (request.method === "PUT") {
  //   const { isFavorite } = request.body;

  //   if (typeof isFavorite !== "boolean") {
  //     response.status(400).json({ error: "Invalid favorite status" });
  //     return;
  //   }

  //   try {
  //     const updatedRemedy = await Remedy.findByIdAndUpdate(id, { isFavorite });

  //     if (!updatedRemedy) {
  //       response.status(404).json({ status: "Not Found" });
  //       return;
  //     }
  //   } catch (error) {
  //     response
  //       .status(500)
  //       .json({ error: "Error updating remedy: " + error.message });
  //     return;
  //   }
  // }

  if (request.method === "DELETE") {
    try {
      await Remedy.findByIdAndDelete(id);
      response.status(200).json({ message: "Success!" });
      return;
    } catch (error) {
      response
        .status(400)
        .json({ error: "Error deleting remedy: " + error.message });
      return;
    }
  } else {
    return response.status(405).json({ error: "Method not allowed" });
  }
}
