import { useState } from "react";
import styled from "styled-components";

export default function Notes({
  onAddNote,
  currentRemedy,
  onDeleteNote,
  onEditNote,
}) {
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
    setShowTextField(false);
  }

  function handleEdit(note) {
    setEditingNote(note);
    setShowTextField(true);
  }

  return (
    <NotesContainer>
      <h2> Notes</h2>
      <button
        className="no-print"
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
            <StyledTextArea
              id="note-input"
              name="notes"
              defaultValue={editingNote ? editingNote.text : ""}
            />
            <button className="no-print" type="submit">
              Save
            </button>
          </form>
          <button
            className="no-print"
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
          <StyledNoteContainer key={note.id}>
            <StyledNote>
              <p>{note.text}</p>
            </StyledNote>
            <ButtonContainer className="no-print">
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => setNoteToDelete(note.id)}>Delete</button>
              {noteToDelete === note.id && (
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
            </ButtonContainer>
          </StyledNoteContainer>
        ))}
      </ul>
    </NotesContainer>
  );
}

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`;

const StyledTextArea = styled.textarea`
  font-family: "DPDorkDiary", cursive;
  font-size: 1.4em;
  text-align: center;
  font-weight: bold;
  margin: 20px;
  width: 250px;
  height: 230px;
  padding: 25px 15px;
  background: #fefabc;
  background-color: #fefabc;
  background-image: linear-gradient(150deg, #efec88 0%, #fefabc 100%);
  border: 1px solid #cccccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledNoteContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const StyledNote = styled.div`
  text-align: center;
  width: 250px;
  height: 230px;
  padding: 25px 15px;
  background: #fefabc;
  background-color: #fefabc;
  background-image: linear-gradient(150deg, #efec88 0%, #fefabc 100%);
  border: 1px solid #cccccc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  list-style-type: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;

  button {
    margin-bottom: 10px;
  }
`;
