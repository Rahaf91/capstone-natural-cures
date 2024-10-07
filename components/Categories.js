import styled from "styled-components";
import { useEffect, useState } from "react";
import remediesData from "../assets/remedies.json";

export default function Categories({ handleCategoryChange, showIcons }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const categories = [
        ...new Set(remediesData.map((remedy) => remedy.category.toLowerCase())),
      ];
      setCategories(
        categories.map((category) => ({
          name: category,
          icon: `/navigation-icons/${category}.svg`,
        }))
      );
    }
    fetchCategories();
  }, []);

  return (
    <>
      {showIcons && (
        <IconContainer>
          {categories.map((category) => (
            <IconWrapper key={category.name} onClick={handleCategoryChange}>
              <IconImage src={category.icon} alt={category.name} />
              <IconLabel>{category.name}</IconLabel>
            </IconWrapper>
          ))}
        </IconContainer>
      )}
    </>
  );
}

const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
  padding: 0.2rem;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const IconImage = styled.img`
  width: 90px;
  height: 90px;
`;

const IconLabel = styled.span`
  font-size: 0.7rem;
`;
