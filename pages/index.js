import RemediesList from "@/components/RemediesList";
import RemedyForm from "@/components/RemedyForm";
import FilterList from "@/components/FilterRemedies";
import { useState } from "react";

export default function HomePage({ remedies, handleAddRemedy }) {
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [filteredRemedies, setFilteredRemedies] = useState(remedies);

  function handleSymptomChange(event) {
    const selected = event.target.value;
    setSelectedSymptom(selected);

    if (selected === "") {
      setFilteredRemedies(remedies);
    } else {
      const filtered = remedies.filter((remedy) =>
        remedy.symptoms.includes(selected)
      );
      setFilteredRemedies(filtered);
    }
  }

  function handleClearFilter() {
    setSelectedSymptom("");
    setFilteredRemedies(remedies);
  }

  return (
    <>
      <h1>Natural Cures</h1>
      <FilterList
        selectedSymptom={selectedSymptom}
        handleSymptomChange={handleSymptomChange}
        handleClearFilter={handleClearFilter}
      />
      <RemedyForm onAddRemedy={handleAddRemedy} />
      {remedies.length === 0 ? (
        <p>You have no remedies left! Please add new remedies</p>
      ) : (
        <RemediesList remedies={filteredRemedies} />
      )}
    </>
  );
}
