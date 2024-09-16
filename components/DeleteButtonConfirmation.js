import { useState } from "react";
import styled from "styled-components";
import { StyledButton } from "./StyledButtons";

export default function DeleteButtonConfirmation({ onDelete }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((prevShowModal) => !prevShowModal);
  }

  function handleConfirmDelete() {
    setShowModal(false);
    onDelete();
  }

  return (
    <>
      <ButtonContainer>
        <StyledButton variant="delete" onClick={toggleModal}>
          Delete Remedy
        </StyledButton>
      </ButtonContainer>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>Are you sure you want to delete the remedy?</p>
            <ButtonGroup>
              <StyledButton variant="delete" onClick={handleConfirmDelete}>
                Delete
              </StyledButton>
              <StyledButton variant="cancel" onClick={toggleModal}>
                Cancel
              </StyledButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(84, 88, 47, 0.9);
`;

const ModalContent = styled.div`
  background-color: #f8fbca;
  margin: auto;
  border: 1px solid #54582f;
  width: 80%;
  max-width: 500px;
  padding: 16px;
  position: relative;
  text-align: center;
`;

const ButtonContainer = styled.div`
  gap: 10px;
  display: flex;
  justify-content: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;
