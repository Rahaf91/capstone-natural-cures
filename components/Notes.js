import { useState } from "react";
import styled from "styled-components";
import { StyledButton } from "./StyledButtons";

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
  }

  function handleEdit(note) {
    setEditingNote(note);
    setShowTextField(true);
  }

  return (
    <NotesContainer>
      <NotesHeader>
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
            <StyledTextArea
              id="note-input"
              name="notes"
              placeholder="Type your note here..."
              defaultValue={editingNote ? editingNote.text : ""}
            />
            <ButtonWrapper>
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
        {currentRemedy.notes?.map((note) => (
          <NoteItem key={note.id}>
            <NoteText>{note.text}</NoteText>
            <NoteTimestamp>{note.timestamp}</NoteTimestamp>

            <NoteActions>
              <StyledButton variant="edit" onClick={() => handleEdit(note)}>
                Edit
              </StyledButton>
              <StyledButton
                variant="edit"
                onClick={() => setNoteToDelete(note.id)}
              >
                Delete
              </StyledButton>
            </NoteActions>

            {noteToDelete === note.id && (
              <DeleteConfirmation>
                <p>Are you sure you want to delete this note?</p>
                <ButtonWrapper>
                  <StyledButton
                    variant="delete"
                    onClick={() => {
                      onDeleteNote(currentRemedy.id, note.id);
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

const StyledTextArea = styled.textarea`
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
