import { useState } from "react";
import styled from "styled-components";

export default function RemedyDeleteButton({ onDelete }) {
  const [showModal, setShowModal] = useState(false);

  const handleDeleteClick = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    onDelete();
  };

  return (
    <>
      <DeleteButton onClick={handleDeleteClick}>Delete Remedy</DeleteButton>

      {showModal && (
        <Modal onClick={handleCloseModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <Container>
              <h1>Delete Remedy</h1>
              <p>Are you sure you want to delete the remedy?</p>
              <ButtonGroup>
                <CancelButton onClick={handleCloseModal}>Cancel</CancelButton>
                <ConfirmDeleteButton onClick={handleConfirmDelete}>
                  Delete
                </ConfirmDeleteButton>{" "}
              </ButtonGroup>
            </Container>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
const DeleteButton = styled.button`
  background-color: #54582f;
  color: #f8fbca;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 20%;
  opacity: 0.9;

  &:hover {
    opacity: 1;
  }
`;

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

const Container = styled.div`
  padding: 16px;
  text-align: center;
`;

const CloseButton = styled.span`
  position: absolute;
  right: 15px;
  top: 10px;
  font-size: 40px;
  font-weight: bold;
  color: #f8fbca;
  cursor: pointer;

  &:hover {
    color: #f44336;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CancelButton = styled.button`
  background-color: #86895d;
  color: #000;
  padding: 14px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 48%;

  &:hover {
    opacity: 0.8;
  }
`;

const ConfirmDeleteButton = styled.button`
  background-color: #bec092;
  color: #000;
  padding: 14px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 48%;

  &:hover {
    opacity: 0.8;
  }
`;
