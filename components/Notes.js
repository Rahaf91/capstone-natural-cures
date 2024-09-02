import { useState } from "react";
import { uid } from "uid";
import useLocalStorage from "use-local-storage";

export default function Notes() {
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [note, setNote] = useLocalStorage("note", "");

  const [showTextField, setShowTextField] = useState(false);

  function saveNote() {
    if (note === "") return;
    const newNote = {
      id: uid(),
      text: note,
      timestamp: new Date().toLocaleString(),
    };
    setNotes([newNote, ...notes]);
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
      <ul>{notes.map(renderNote)}</ul>
    </div>
  );
  function renderNote(note) {
    return (
      <li key={note.id}>
        <p>{note.text}</p>
        <p>{note.timestamp}</p>
      </li>
    );
  }
}
