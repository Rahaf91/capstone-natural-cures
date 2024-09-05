import { useState } from "react";


export default function Notes({ onAddNote, currentRemedy, onDeleteNote,onEditNote }) {
  const [showTextField, setShowTextField] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [editingNote, setEditingNote] = useState(null);


  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const textArea = form.elements.notes;

    const newNote = {
      text: textArea.value,
      timestamp: new Date().toLocaleString(),
    };

    if (editingNote) {
      onEditNote(currentRemedy.id, editingNote.id, newNote);
      setEditingNote(null);
    } else {
      onAddNote(currentRemedy.id, newNote);
    }
    form.reset();
    textArea.focus();
  }

  function handleEdit(note) {
    setEditingNote(note);
    setShowTextField(true);
  }

  return (
    <>
      <h2>Take notes</h2>
      <button
        onClick={() => {
          setShowTextField(!showTextField);
          setEditingNote(null);
        }}
      >
        {editingNote ? "Edit Note" : "Add Note"}
      </button>
      {showTextField && (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="note-input"></label>
            <textarea
              id="note-input"
              name="notes"
              defaultValue={editingNote ? editingNote.text : ""}
            />
            <button type="submit">Save</button>
          </form>
          <button
            onClick={() => {
              setShowTextField(!showTextField);
              setEditingNote(null);
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

             <button onClick={() => handleEdit(note)}>Edit</button>
            <button onClick={() => setNoteToDelete(note.id)}>Delete</button>
            {noteToDelete && (
              <div>
                <p>Are you sure you want to delete this note?</p>
                <button
                  onClick={() => {
                    onDeleteNote(currentRemedy.id, note.id);
                    setNoteToDelete(null);
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setNoteToDelete(null)}>No</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
