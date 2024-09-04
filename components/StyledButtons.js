import styled from "styled-components";
export const StyledButton = styled.button`
  background-color: var(--background-color-button);
  color: var(--color-button);
  border: none;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #54582f;
    transform: scale(1.05);
  }
`;
export const DeleteButton = styled(StyledButton)`
  background-color: var(--delete-button-color);
  color: var(--font-color);
  margin-right: 10px;
  &:hover {
    background-color: #c9302c;
  }
`;
export const EditButton = styled(StyledButton)`
  background-color: var(--edit-button-color);
  color: var(--font-color);
  &:hover {
    background-color: #31b0d5;
  }
`;
const ModalButton = styled(StyledButton)`
  padding: 10px 20px;
  margin-right: 10px;
  margin-top: 20px;
`;
export const ModalDeleteButton = styled(ModalButton)`
  background-color: var(--delete-button-color);
  color: var(--font-color);
  &:hover {
    background-color: #c9302c;
  }
`;
export const ModalCancelButton = styled(ModalButton)`
  background-color: var(--modal-cancel-color);
  color: var(--font-color);
  &:hover {
    background-color: #5a6268;
  }
`;
export const RemoveFilterButton = styled(StyledButton)`
  background-color: var(--remove-filter-color);
  color: #fff;
  font-weight: bold;
  margin-right: 10px;
  padding: 10px 20px;
  &:hover {
    background-color: #e67342;
  }
`;
// `
//   padding: 10px 20px;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   background-color: var(--button-color);
//   color: white;
//   font-size: 1rem;
//   transition: background-color 0.3s ease;
//   &:hover {
//     background-color: #85895E;
//   }
//   &:disabled {
//     background-color: #D3D3D3;
//     cursor: not-allowed;
//   }
//   &.delete-button {
//     background-color: var(--danger-color);
//   }
//   &.delete-button:hover {
//     background-color: #FA5252;
//   }
// `
/*Button styled form
import styled, { css } from "styled-components";
export const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: #034F84;
      color: white;
    `}
  ${(props) =>
    props.$variant === "danger" &&
    css`
      background-color: #C94C4C;
      color: white;
    `}
    ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: #878F99;
      color: white;
    `}
    ${(props) =>
    props.$variant === "success" &&
    css`
      background-color: #405D27;
      color: white;
    `}
    &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 45rem;
  margin: 0 auto;
  padding-bottom: 2rem;
`;
*/
