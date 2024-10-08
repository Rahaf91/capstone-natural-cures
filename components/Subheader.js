import styled from "styled-components";

export default function Subheader({ selectedCategory }) {
  if (!selectedCategory) return null;

  const iconSrc = `/navigation-icons/${selectedCategory}.svg`;

  return (
    <SubheaderWrapper>
      <CategoryIcon src={iconSrc} alt={selectedCategory} />
      <CategoryTitle>{selectedCategory}</CategoryTitle>
    </SubheaderWrapper>
  );
}

const SubheaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 0, 5rem;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CategoryTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const CategoryIcon = styled.img`
  width: 8em;
  height: 8em;
`;
