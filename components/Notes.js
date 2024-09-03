import { useState } from "react";
import { uid } from "uid";
import useLocalStorage from "use-local-storage";

export default function Notes({ remedyId }) {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [note, setNote] = useState("");

  const [showTextField, setShowTextField] = useState(false);
  const currentRemedyNotes = notes[remedyId] || [];

  function saveNote() {
    if (note === "") return;

    const newNote = {
      id: uid(),
      text: note,
      timestamp: new Date().toLocaleString(),
    };
    const updatedNotes = {
      ...notes,
      [remedyId]: [newNote, ...currentRemedyNotes],
    };

    setNotes(updatedNotes);
    setNote("");
    setShowTextField(false);
  }
  function cancelNote() {
    setNote("");
    setShowTextField(false);
  }
  function handleNoteChange(event) {
    setNote(event.target.value);
  }
  function toggleTextField() {
    setShowTextField(!showTextField);
  }
  return (
    <div>
      <h2>Take notes</h2>
      <button onClick={toggleTextField}>Add Note</button>
      {showTextField && (
        <div>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Write your note here"
          />
          <button onClick={saveNote}>Save</button>
          <button onClick={cancelNote}>Cancel</button>
        </div>
      )}
      <ul>
        {currentRemedyNotes.map((note) => (
          <li key={note.id}>
            <p>{note.text}</p>
            <p>{note.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
