import RemediesList from "@/components/RemediesList";
import { useState } from "react";
import { StyledLinks } from "@/components/StyledLinks";
import Categories from "@/components/Categories";
import CategoriesBackButton from "@/components/CategoriesBackButton";
import SearchBar from "@/components/SearchBar";
import DailyHealthTips from "@/components/DailyHealthTips";

export default function HomePage({
  remedies,
  handleToggleFavorite,
  handleSearchQuery,
  handleCategoryChange,
  searchQuery,
}) {
  const [showIcons, setShowIcons] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);

  function handleSymptomChange(event) {
    const selected = event.target.value;
    setSelectedSymptom(selected);
  }

  function handleClearFilter() {
    setSelectedSymptom("");
  }

  function handleCategoryChangeInternal(event) {
    handleCategoryChange(event.target.alt);
    setShowIcons(false);
    setShowBackButton(true);
    setShowSearchBar(false);
  }

  function handleBackClick() {
    handleCategoryChange("");
    setShowIcons(true);
    setShowBackButton(false);
    setShowSearchBar(true);
  }

  function handleSearchQueryInternal(event) {
    const value = event.currentTarget.value;
    handleSearchQuery(value);
    value === "" ? setShowIcons(true) : setShowIcons(false);
  }

  function handleClearSearchBar() {
    handleSearchQuery("");
    setShowIcons(true);
  }

  return (
    <>
      <SearchBar
        handleSearchQuery={handleSearchQueryInternal}
        handleClearSearchBar={() => {
          handleClearSearchBar();
        }}
        searchQuery={searchQuery}
        showSearchBar={true}
        renderIcon={() => <i className="search-icon" />}
      />
      <Categories
        handleToggleFavorite={handleToggleFavorite}
        handleCategoryChange={handleCategoryChangeInternal}
        showIcons={showIcons}
      />
      {showIcons}
      <RemediesList
        remedies={remedies}
        handleToggleFavorite={handleToggleFavorite}
      />
      <CategoriesBackButton
        handleBackClick={handleBackClick}
        showBackButton={showBackButton}
      ></CategoriesBackButton>
      <StyledLinks href="/remedy/add">Add Remedy</StyledLinks> <br />
      <DailyHealthTips />
      <StyledLinks $variant="bookmarked" href="/favorites">
        View Bookmarked remedies
      </StyledLinks>
    </>
  );
}
