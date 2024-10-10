import dbConnect from "@/db/connect";
import Remedy from "@/db/models/Remedy";

export default async function handler(request, response) {
  await dbConnect();
  const { id, noteId } = request.query;

  if (request.method === "POST") {
    try {
      const { text } = request.body;

      if (!text) {
        return response.status(400).json({ error: "Note text is required" });
      }

      const updatedRemedy = await Remedy.findByIdAndUpdate(
        id,
        {
          $push: {
            notes: {
              $each: [
                {
                  text,
                  timestamp: new Date().toLocaleString(),
                },
              ],
              $position: 0,
            },
          },
        },
        { new: true, runValidators: true }
      );
      if (!updatedRemedy) {
        return response.status(404).json({ status: "Not Found" });
      }

      return response.status(200).json(updatedRemedy);
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (request.method === "PUT") {
    const { text } = request.body;

    if (!text) {
      return response.status(400).json({ error: "Missing note text" });
    }

    try {
      const updatedRemedy = await Remedy.findOneAndUpdate(
        { _id: id, "notes._id": noteId },
        {
          $set: {
            "notes.$.text": text,
            "notes.$.timestamp": new Date().toLocaleString(),
          },
        },
        { new: true }
      );

      if (!updatedRemedy) {
        return response.status(404).json({ error: "Note or Remedy not found" });
      }

      return response.status(200).json(updatedRemedy);
    } catch (error) {
      return response.status(500).json({ error: "Error editing note" });
    }
  }

  if (request.method === "DELETE") {
    try {
      const updatedRemedy = await Remedy.findByIdAndUpdate(
        id,
        { $pull: { notes: { _id: noteId } } },
        { new: true }
      );

      if (!updatedRemedy) {
        return response.status(404).json({ error: "note not found" });
      }

      return response.status(200).json(updatedRemedy);
    } catch (error) {
      return response.status(500).json({ error: "Error deleting note" });
    }
  }
}
