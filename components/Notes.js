import { useState } from "react";

export default function Notes({ onAddNote, currentRemedy }) {
  const [showTextField, setShowTextField] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const textArea = form.elements.notes;

    const newNote = {
      text: textArea.value,
      timestamp: new Date().toLocaleString(),
    };

    onAddNote(currentRemedy.id, newNote);

    form.reset();
    textArea.focus();
  }

  return (
    <>
      <h2>Take notes</h2>
      <button
        onClick={() => {
          setShowTextField(!showTextField);
        }}
      >
        Add Note
      </button>
      {showTextField && (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="note-input"></label>
            <textarea id="note-input" name="notes" />
            <button type="submit">Save</button>
          </form>
          <button
            onClick={() => {
              setShowTextField(!showTextField);
            }}
          >
            Cancel
          </button>
        </>
      )}
      <ul>
        {currentRemedy.notes?.map((note) => (
          <li key={note.id}>
            <p>{note.text}</p>
            <p>{note.timestamp}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
