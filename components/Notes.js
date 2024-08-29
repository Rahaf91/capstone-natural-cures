import React, { useState } from "react";

export default function Notes() {
  const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState("");

    const handleSaveNote = () => {
      if (note === "") return;
      const newNote = {
        id: notes.length + 1,
        text: note,
      };
      setNotes([...notes, newNote]);
      setNote("");
    };

    const handleCancelNote = () => {
      setNote("");
    };

const handleEditNote = (id) => {
      const noteToEdit = notes.find((note) => note.id === id);
      setNote(noteToEdit.text);
      handleDeleteNote(id);
    };

    const handleDeleteNote = (id) => {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    };

  return (
    <div>
      <h2>Take notes</h2>
      <textarea
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Write your note here"
      />
      <button onClick={handleSaveNote}>Save</button>
      <button onClick={handleCancelNote}>Cancel</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.text}</p>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            <button onClick={() => handleEditNote(note.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
  }