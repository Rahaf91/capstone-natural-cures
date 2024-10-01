import RemediesList from "@/components/RemediesList";
import { useState } from "react";
import { StyledLinks } from "@/components/StyledLinks";
import Categories from "@/components/Categories";
import CategoriesBackButton from "@/components/CategoriesBackButton";
import SearchBar from "@/components/SearchBar";
import DailyHealthTips from "@/components/DailyHealthTips";
import SymptomFilter from "@/components/SymptomFilter";

// +
import Subheader from "@/components/Subheader";
// +

export default function HomePage({
  remedies,
  handleToggleFavorite,
  handleSearchQuery,
  handleCategoryChange,
  handleSymptomChange,
  searchQuery,
  selectedCategory,
}) {
  const [showIcons, setShowIcons] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showSymptomFilter, setShowSymptomFilter] = useState(false);
  const [showDailyHealthTips, setShowDailyHealthTips] = useState(true);

  function handleSymptomChangeInternal(event) {
    handleSymptomChange(event.target.value);
  }

  function handleCategoryChangeInternal(event) {
    handleCategoryChange(event.target.alt);
    setShowIcons(false);
    setShowBackButton(true);
    setShowSearchBar(false);
    setShowSymptomFilter(true);
    setShowDailyHealthTips(false);
  }

  function handleBackClick() {
    handleCategoryChange("");
    handleSymptomChange("all");
    setShowIcons(true);
    setShowBackButton(false);
    setShowSearchBar(true);
    setShowSymptomFilter(false);
    setShowDailyHealthTips(true);
  }

  function handleSearchQueryInternal(event) {
    const value = event.currentTarget.value;
    handleSearchQuery(value);
    value === "" ? setShowIcons(true) : setShowIcons(false);
    // D
    setShowDailyHealthTips(false);
    // D
  }

  function handleClearSearchBar() {
    handleSearchQuery("");
    setShowIcons(true);
    // D
    setShowDailyHealthTips(true);
    // D
  }

  return (
    <>
      {/* + */}
      <Subheader selectedCategory={selectedCategory} />
      {/* + */}
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
      <SymptomFilter
        handleSymptomChange={handleSymptomChangeInternal}
        category={selectedCategory}
        showSymptomFilter={showSymptomFilter}
      />
      <RemediesList
        remedies={remedies}
        handleToggleFavorite={handleToggleFavorite}
      />
      <CategoriesBackButton
        handleBackClick={handleBackClick}
        showBackButton={showBackButton}
      ></CategoriesBackButton>
      <StyledLinks href="/remedy/add">Add Remedy</StyledLinks> <br />
      <DailyHealthTips showDailyHealthTips={showDailyHealthTips} />
      <StyledLinks $variant="bookmarked" href="/favorites">
        View Bookmarked remedies
      </StyledLinks>
    </>
  );
}
