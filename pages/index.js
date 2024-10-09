import RemediesList from "@/components/RemediesList";
import Link from "next/link";
import FilterList from "@/components/FilterList";
import { useState } from "react";
import { useRouter } from "next/router";

export default function HomePage({ remedies, handleToggleFavorite }) {
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const router = useRouter();

  function isLoggedIn() {
    // Logik zum Überprüfen, ob der Benutzer eingeloggt ist
    return !!localStorage.getItem("userToken"); // Beispielhafte Überprüfung
  }

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

  function handleAddRemedyClick() {
    if (!isLoggedIn()) {
      router.push("/login"); // Zur Login-Seite weiterleiten
    } else {
      router.push("/remedy/add"); // Zur Heilmittel-Hinzufügen-Seite weiterleiten
    }
  }

  function handleToggleFavoriteClick(remedyId) {
    if (!isLoggedIn()) {
      router.push("/login"); // Zur Login-Seite weiterleiten
    } else {
      handleToggleFavorite(remedyId); // Favoriten-Status umschalten
    }
  }

  return (
    <>
      <h1>Natural Cures</h1>
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

      <button onClick={handleAddRemedyClick}>Add Remedy </button>
      <br />
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
