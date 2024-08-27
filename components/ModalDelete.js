import { useState } from "react";
import styled from "styled-components";

export default function RemedyDeleteButton({ onDelete }) {
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
      <DeleteButton onClick={toggleModal}>Delete Remedy</DeleteButton>
      {showModal && (
        <Modal>
          <ModalContent>
            <p>Are you sure you want to delete the remedy?</p>
            <button onClick={handleConfirmDelete}>Delete</button>
            <button onClick={toggleModal}>Cancel</button>
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
