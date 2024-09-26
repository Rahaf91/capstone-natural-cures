import styled from "styled-components";
import { useEffect, useState } from "react";
import remediesData from "../assets/remedies.json";
import RemediesList from "@/components/RemediesList";
import SearchBar from "@/components/SearchBar";

export default function Categories({
  handleToggleFavorite,
  handleSearchQuery,
  searchQuery,
  handleCategoryClick,
  handleBackClick,
  showIcons,
  setShowIcons,
}) {
  const [categories, setCategories] = useState([]);
  const [filteredRemedies, setFilteredRemedies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  useEffect(() => {
    if (selectedCategory) {
      const filtered = remediesData.filter(
        (remedy) =>
          remedy.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setFilteredRemedies(filtered);
    }
  }, [selectedCategory]);

  function handleCategoryClickInternal(category) {
    setSelectedCategory(category);
    handleCategoryClick(category);
  }

  function handleBackClickInternal() {
    setSelectedCategory("");
    handleBackClick();
  }

  function handleSearchQueryInternal(event) {
    handleSearchQuery(event);
    setShowIcons(false);
  }

  return (
    <>
      {showIcons && (
        <SearchBar
          handleSearchQuery={handleSearchQueryInternal}
          handleClearSearchBar={() => {
            handleSearchQuery({ currentTarget: { value: "" } });
            setShowIcons(true);
          }}
          searchQuery={searchQuery}
        />
      )}
      {showIcons ? (
        <IconContainer>
          {categories.map((category) => (
            <IconWrapper
              key={category.name}
              onClick={() => handleCategoryClickInternal(category.name)}
            >
              <IconImage src={category.icon} alt={category.name} />
              <IconLabel>{category.name}</IconLabel>
            </IconWrapper>
          ))}
        </IconContainer>
      ) : (
        <>
          <BackButton onClick={handleBackClickInternal}>Back</BackButton>
          <RemediesList
            remedies={filteredRemedies}
            handleToggleFavorite={handleToggleFavorite}
          />
        </>
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

const BackButton = styled.button`
  margin: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  background-color: #54582f;
  color: white;
`;
