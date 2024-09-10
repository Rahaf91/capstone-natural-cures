import RemediesList from "@/components/RemediesList";
import RemedyForm from "@/components/RemedyForm";
import Link from "next/link";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import HealthTipsCarousel from "@/components/DailyHealthTips";

export default function HomePage({
  remedies,
  dailyTips,
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
      <h1>Natural Cures</h1>
      <HealthTipsCarousel dailyhealthtips={dailyTips} />
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
      <Link href="/favorites">View Bookmarked remedies</Link>
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
