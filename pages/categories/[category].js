import { useRouter } from "next/router";
import RemediesList from "@/components/RemediesList";
import { StyledLinks } from "@/components/StyledLinks";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import styled from "styled-components";
import Image from "next/image";

export default function CategoryPage({
  handleToggleFavorite,
  handleSearchQuery,
  searchQuery,
  remedies,
}) {
  const router = useRouter();
  const { category } = router.query;
  const [selectedSymptom, setSelectedSymptom] = useState("");

  if (!category) {
    return <p>Loading...</p>;
  }

  const filteredRemediesByCategory = remedies.filter(
    (remedy) => remedy.category.toUpperCase() === category.toUpperCase()
  );
  const getSymptoms = Array.from(
    new Set(filteredRemediesByCategory.flatMap((remedy) => remedy.symptoms))
  );

  function handleSymptomChange(event) {
    const selected = event.target.value;
    setSelectedSymptom(selected);
  }

  function handleClearFilter() {
    setSelectedSymptom("");
  }

  const finalFilteredRemedies = selectedSymptom
    ? filteredRemediesByCategory.filter((remedy) =>
        remedy.symptoms.includes(selectedSymptom)
      )
    : filteredRemediesByCategory;

  return (
    <>
      <FilterList
        symptoms={getSymptoms}
        selectedSymptom={selectedSymptom}
        handleSymptomChange={handleSymptomChange}
        handleClearFilter={handleClearFilter}
      />

      <MainContainer>
        <Categories showIcons={true} activeCategory={category} />
        <SearchBar
          handleSearchQuery={handleSearchQuery}
          handleClearSearchBar={() =>
            handleSearchQuery({ currentTarget: { value: "" } })
          }
          searchQuery={searchQuery}
        />

        <BackButtonWrapper>
          <StyledLinks $variant="back" href="/">
            <Image src="/back.svg" alt="back icon" width={60} height={60} />
          </StyledLinks>
        </BackButtonWrapper>

        {finalFilteredRemedies.length === 0 ? (
          <p>No remedies found for this category.</p>
        ) : (
          <RemediesList
            remedies={finalFilteredRemedies}
            handleToggleFavorite={handleToggleFavorite}
          />
        )}
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  box-shadow: var(--box-shadow);
  border-radius: var(--border-radius);

  @media (max-width: 600px) {
    box-shadow: none;
  }
`;
const BackButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;
