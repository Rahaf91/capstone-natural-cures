import RemediesList from "@/components/RemediesList";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import { StyledLinks } from "@/components/StyledLinks";
import { StyledButton } from "@/components/StyledButtons";
export default function HomePage({ remedies, handleToggleFavorite }) {
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
        />
      )}
    </>
  );
}
