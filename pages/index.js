import RemediesList from "@/components/RemediesList";
import { useState } from "react";
import { StyledLinks } from "@/components/StyledLinks";
import Categories from "@/components/Categories";

export default function HomePage({
  remedies,
  handleToggleFavorite,
  handleSearchQuery,
  searchQuery,
}) {
  const [selectedSymptom, setSelectedSymptom] = useState("");
  const [showIcons, setShowIcons] = useState(true);

  function handleSymptomChange(event) {
    const selected = event.target.value;
    setSelectedSymptom(selected);
  }

  function handleClearFilter() {
    setSelectedSymptom("");
  }

  function handleCategoryClick(category) {
    setShowIcons(false);
  }

  function handleBackClick() {
    setShowIcons(true);
  }

  return (
    <>
      <Categories
        handleToggleFavorite={handleToggleFavorite}
        handleSearchQuery={handleSearchQuery}
        searchQuery={searchQuery}
        handleCategoryClick={handleCategoryClick}
        handleBackClick={handleBackClick}
        showIcons={showIcons}
        setShowIcons={setShowIcons}
      />
      {showIcons}
      <StyledLinks $variant="bookmarked" href="/favorites">
        View Bookmarked remedies
      </StyledLinks>
      <RemediesList
        remedies={remedies}
        handleToggleFavorite={handleToggleFavorite}
        handleSearchQuery={handleSearchQuery}
        searchQuery={searchQuery}
      />
    </>
  );
}
