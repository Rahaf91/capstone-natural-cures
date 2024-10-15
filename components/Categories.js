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
              src={`/navigation-icons/${activeCategory}.svg`}
              alt={activeCategory}
              width={100}
              height={100}
            />
          )}
          <CategoryName>{activeCategory}</CategoryName>
        </CategoryLink>
      ) : (
        categories.map((category) => (
          <CategoryLink key={category} href={`/categories/${category}`}>
            {showIcons && (
              <Image
                src={`/navigation-icons/${category}.svg`}
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
  margin: 10px;
  width: 100px;
`;

const CategoryName = styled.span`
  margin-top: 5px;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
