import styled from "styled-components";

export default function CategoriesBackButton({
  showBackButton,
  handleBackClick,
}) {
  return (
    <>
      {showBackButton && (
        <BackButton onClick={handleBackClick}>Back</BackButton>
      )}
    </>
  );
}

const BackButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #54582f;
  color: white;
`;
