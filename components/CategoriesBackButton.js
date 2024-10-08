import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CategoriesBackButton({
  showBackButton,
  handleBackClick,
}) {
  return (
    <>
      {showBackButton && (
        <BackButton onClick={handleBackClick}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </BackButton>
      )}
    </>
  );
}

const BackButton = styled.button`
  position: fixed;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #54582f;
  color: white;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  display: flex;
  align-items: center;
  justify-content: center;
`;
