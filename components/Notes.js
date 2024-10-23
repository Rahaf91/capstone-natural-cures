import styled from "styled-components";
import { StyledButton } from "./StyledButtons";
import { useEffect, useState } from "react";

export default function Notes({
  onAddNote,
  currentRemedy,
  onDeleteNote,
  onEditNote,
}) {
  const [showTextField, setShowTextField] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [editingNote, setEditingNote] = useState(null);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch("/api/user/");
      const data = await response.json();
      console.log(data.notes);
      // const notesFiltered = data.notes.filter(
      //   (note) => note.remedyId === currentRemedy._id
      // );
      setNotes(data.notes);
    }
    fetchNotes();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const textArea = form.elements.notes;

    const newNote = {
      // _id: editingNote?._id || undefined,
      note: textArea.value,
      createdAt: new Date().toLocaleString(),
      remedyId: currentRemedy._id,
    };

    if (editingNote) {
      onEditNote(currentRemedy._id, editingNote._id, newNote);
      setEditingNote(null);
    } else {
      onAddNote(currentRemedy._id, newNote);
    }

    form.reset();
    textArea.focus();
    setShowTextField(false);
  }

  function handleEdit(note) {
    setEditingNote(note);
    setShowTextField(true);
  }
  function convertToLocalTime(utcDate) {
    const date = new Date(utcDate);
    return date.toLocaleString();
  }

  return (
    <NotesContainer>
      <NotesHeader className="no-print">
        <StyledButton
          variant="primary"
          size="small"
          onClick={() => {
            setShowTextField(!showTextField);
            setEditingNote(null);
          }}
        >
          {editingNote ? "Edit Note" : "Add Note"}
        </StyledButton>
      </NotesHeader>

      {showTextField && (
        <>
          <NoteForm onSubmit={handleSubmit}>
            <label htmlFor="note-input"></label>

            <TextArea
              id="note-input"
              name="notes"
              placeholder="Type your note here..."
              defaultValue={editingNote ? editingNote.text : ""}
            />
            <ButtonWrapper className="no-print">
              <StyledButton variant="primary" type="submit">
                Save
              </StyledButton>
              <StyledButton
                variant="cancel"
                type="button"
                onClick={() => {
                  setShowTextField(false);
                  setEditingNote(null);
                }}
              >
                Cancel
              </StyledButton>
            </ButtonWrapper>
          </NoteForm>
        </>
      )}

      <NoteList>
        {notes?.map((note) => (
          <NoteItem key={note._id}>
            <NoteText>{note.note}</NoteText>
            <NoteTimestamp>{convertToLocalTime(note.createdAt)}</NoteTimestamp>

            <NoteActions className="no-print">
              <StyledButton variant="edit" onClick={() => handleEdit(note)}>
                Edit
              </StyledButton>
              <StyledButton
                variant="edit"
                onClick={() => setNoteToDelete(note._id)}
              >
                Delete
              </StyledButton>
            </NoteActions>

            {noteToDelete === note._id && (
              <DeleteConfirmation>
                <p>Are you sure you want to delete this note?</p>
                <ButtonWrapper className="no-print">
                  <StyledButton
                    variant="delete"
                    onClick={() => {
                      onDeleteNote(currentRemedy._id, note._id);
                      setNoteToDelete(null);
                    }}
                  >
                    Yes
                  </StyledButton>
                  <StyledButton
                    variant="primary"
                    onClick={() => setNoteToDelete(null)}
                  >
                    No
                  </StyledButton>
                </ButtonWrapper>
              </DeleteConfirmation>
            )}
          </NoteItem>
        ))}
      </NoteList>
    </NotesContainer>
  );
}

const NotesContainer = styled.div`
  margin: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f0f4c3, #dcedc1);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const NoteForm = styled.form`
  margin-top: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #b2ebf2;
  border-radius: 0.5rem;
  background-color: #f7fff7;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 1rem;
  transition: border 0.3s ease;

  &:focus {
    border: 1px solid #26a69a;
    outline: none;
    box-shadow: 0 0 8px rgba(38, 166, 154, 0.4);
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NoteList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const NoteItem = styled.li`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  margin-bottom: 1rem;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`;

const NoteText = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const NoteTimestamp = styled.p`
  font-size: 0.8rem;
  color: #888;
`;

const NoteActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;

  button {
    font-size: 0.875rem;
    border-radius: 0.5rem;
  }
`;

const DeleteConfirmation = styled.div`
  margin-top: 0.5rem;
  background-color: #ffe6e6;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    font-size: 1rem;
    color: #c0392b;
  }
`;
