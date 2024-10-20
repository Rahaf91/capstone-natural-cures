import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function Categories({
  showIcons,
  activeCategory,
  remedies = [],
}) {
  const categories = [
    ...new Set(remedies.map((remedy) => remedy.category.toUpperCase())),
  ];

  return (
    <CategoriesContainer>
      {activeCategory ? (
        <CategoryLink href={`/categories/${activeCategory}`}>
          {showIcons && (
            <Image
              src={`/navigation-icons/${activeCategory.toLowerCase()}.svg`}
              alt={activeCategory}
              width={100}
              height={100}
            />
          )}
          <CategoryName>{activeCategory.toUpperCase()}</CategoryName>
        </CategoryLink>
      ) : (
        categories.map((category) => (
          <CategoryLink key={category} href={`/categories/${category}`}>
            {showIcons && (
              <StyledImage
                src={`/navigation-icons/${category.toLowerCase()}.svg`}
                alt={category}
                width={100}
                height={100}
              />
            )}
            <CategoryName>{category}</CategoryName>
          </CategoryLink>
        ))
      )}
    </CategoriesContainer>
  );
}

const CategoryLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  margin: 1rem;
`;

const CategoryName = styled.span`
  color: var(--text-color);
  font-size: 1rem;
  font-style: bold;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;
const StyledImage = styled(Image)`
  &:hover {
    transform: scale(1.3);
  }
`;
