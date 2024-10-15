import { useRouter } from "next/router";
import RemediesList from "@/components/RemediesList";
import { StyledLinks } from "@/components/StyledLinks";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import Categories from "@/components/Categories";
import styled from "styled-components";

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
    (remedy) => remedy.category.toUpperCase() === category
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
      <StyledLinks $variant="back" href="/">
        &larr; Back
      </StyledLinks>
      <Categories showIcons={true} activeCategory={category} />
      <Container>
        <SearchBar
          handleSearchQuery={handleSearchQuery}
          handleClearSearchBar={() =>
            handleSearchQuery({ currentTarget: { value: "" } })
          }
          searchQuery={searchQuery}
        />

        <FilterList
          symptoms={getSymptoms}
          selectedSymptom={selectedSymptom}
          handleSymptomChange={handleSymptomChange}
          handleClearFilter={handleClearFilter}
        />
      </Container>
      {finalFilteredRemedies.length === 0 ? (
        <p>No remedies found for this category.</p>
      ) : (
        <RemediesList
          remedies={finalFilteredRemedies}
          handleToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;
