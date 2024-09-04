import RemediesList from "@/components/RemediesList";
import RemedyForm from "@/components/RemedyForm";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import { StyledLinks } from "@/components/StyledLinks";
export default function HomePage({
  remedies,
  handleAddRemedy,
  handleToggleFavorite,
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
      {filteredRemedies.length === 0 && selectedSymptom ? (
        <>
          <p>Sorry, no remedies were found. Please try another symptom</p>
          <button type="button" onClick={handleClearFilter}>
            Clear Filter
          </button>
        </>
      ) : (
        <FilterList
          selectedSymptom={selectedSymptom}
          handleSymptomChange={handleSymptomChange}
          handleClearFilter={handleClearFilter}
        />
      )}
      <RemedyForm onAddRemedy={handleAddRemedy} />
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
