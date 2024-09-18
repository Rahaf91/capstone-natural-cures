import RemediesList from "@/components/RemediesList";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import { StyledLinks } from "@/components/StyledLinks";
import { StyledButton } from "@/components/StyledButtons";

import SearchBar from "@/components/SearchBar";
import DailyHealthTips from "@/components/DailyHealthTips";

export default function HomePage({
  remedies,
  handleToggleFavorite,
  handleSearchQuery,
  searchQuery,
}) {
  const [selectedSymptom, setSelectedSymptom] = useState("");

  function handleSymptomChange(event) {
    const selected = event.target.value;
    setSelectedSymptom(selected);
  }

  function handleClearFilter() {
    setSelectedSymptom("");
  }

  const filteredRemedies = selectedSymptom
    ? remedies.filter((remedy) => remedy.symptoms.includes(selectedSymptom))
    : remedies;

  return (
    <>

      <h1>Natural Cures</h1>
      <SearchBar
        handleSearchQuery={handleSearchQuery}
        handleClearSearchBar={() =>
          handleSearchQuery({ currentTarget: { value: "" } })
        }
        searchQuery={searchQuery}
      />
      {filteredRemedies.length === 0 && selectedSymptom ? (
        <>
          <p>Sorry, no remedies were found. Please try another symptom</p>
          <StyledButton
            variant="primary"
            type="button"
            onClick={handleClearFilter}
          >
            Clear Filter
          </StyledButton>
        </>
      ) : (
        <FilterList
          selectedSymptom={selectedSymptom}
          handleSymptomChange={handleSymptomChange}
          handleClearFilter={handleClearFilter}
        />
      )}
 <DailyHealthTips />
      <StyledLinks href="/remedy/add">Add Remedy</StyledLinks> <br />
      <StyledLinks $variant="bookmarked" href="/favorites">
        View Bookmarked remedies
      </StyledLinks>

      {remedies.length === 0 ? (
        <p>You have no remedies left! Please add new remedies</p>
      ) : (
        <RemediesList
          remedies={filteredRemedies}
          handleToggleFavorite={handleToggleFavorite}
          handleSearchQuery={handleSearchQuery}
          searchQuery={searchQuery}
        />
      )}
    </>
  );
}
