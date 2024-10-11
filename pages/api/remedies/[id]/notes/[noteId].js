import dbConnect from "@/db/connect";
import Remedy from "@/db/models/Remedy";

export default async function handler(request, response) {
  await dbConnect();
  const { id, noteId } = request.query;

  if (request.method === "POST") {
    try {
      const { text } = request.body;

      if (!text) {
        response.status(400).json({ error: "Note text is required" });
        return;
      }

      const updatedRemedy = await Remedy.findByIdAndUpdate(id, {
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
      });
      if (!updatedRemedy) {
        response.status(404).json({ status: "Not Found" });
        return;
      }

      response.status(200).json(updatedRemedy);
      return;
    } catch (error) {
      response.status(500).json({ error: "Internal Server Error" });
      return;
    }
  }

  if (request.method === "PUT") {
    const { text } = request.body;

    if (!text) {
      response.status(400).json({ error: "Missing note text" });
      return;
    }

    try {
      const updatedRemedy = await Remedy.findOneAndUpdate(
        { _id: id, "notes._id": noteId },
        {
          $set: {
            "notes.$.text": text,
            "notes.$.timestamp": new Date().toLocaleString(),
          },
        }
      );

      if (!updatedRemedy) {
        response.status(404).json({ error: "Note or Remedy not found" });
        return;
      }

      response.status(200).json(updatedRemedy);
      return;
    } catch (error) {
      response.status(500).json({ error: "Error editing note" });
      return;
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
        response.status(404).json({ error: "note not found" });
        return;
      }

      response.status(200).json(updatedRemedy);
      return;
    } catch (error) {
      response.status(500).json({ error: "Error deleting note" });
      return;
    }
  }
}
