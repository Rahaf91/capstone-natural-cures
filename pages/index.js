import RemediesList from "@/components/RemediesList";
import { useState, useEffect } from "react";
import { StyledLinks } from "@/components/StyledLinks";
import Categories from "@/components/Categories";
import CategoriesBackButton from "@/components/CategoriesBackButton";
import SearchBar from "@/components/SearchBar";
import DailyHealthTips from "@/components/DailyHealthTips";
import SymptomFilter from "@/components/SymptomFilter";
import Subheader from "@/components/Subheader";
import { useRouter } from "next/router";
import Fuse from "fuse.js";

export default function HomePage({
  remedies,
  handleToggleFavorite,
  handleSearchQuery,
  handleCategoryChange,
  handleSymptomChange,
  searchQuery,
  selectedCategory,
  selectedSymptoms,
}) {
  const [showIcons, setShowIcons] = useState(true);
  const [showBackButton, setShowBackButton] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showSymptomFilter, setShowSymptomFilter] = useState(false);
  const [showDailyHealthTips, setShowDailyHealthTips] = useState(true);
  const [showRemediesList, setShowRemediesList] = useState(false);
  const router = useRouter();
  const { category } = router.query;

  const fuse = new Fuse(remedies, {
    keys: ["title", "ingredients", "usage", "symptoms"],
    includeScore: true,
    threshold: 0,
    useExtendedSearch: true,
    ignoreLocation: true,
    ignoreFieldNorm: true,
    shouldSort: true,
  });

  function matchesQueryAtWordStart(item, query) {
    const regex = new RegExp(`\\b${query}`, "i");
    return (
      regex.test(item.title) ||
      item.ingredients.some((ingredient) => regex.test(ingredient)) ||
      regex.test(item.usage) ||
      item.symptoms.some((symptom) => regex.test(symptom))
    );
  }

  const results = searchQuery ? fuse.search(searchQuery) : [];
  const filteredRemedies = searchQuery
    ? results
        .map((result) => result.item)
        .filter((item) => matchesQueryAtWordStart(item, searchQuery))
    : remedies;

  useEffect(() => {
    if (category) {
      handleCategoryChange(category);
      setShowIcons(false);
      setShowBackButton(true);
      setShowSearchBar(false);
      setShowSymptomFilter(true);
      setShowDailyHealthTips(false);
      setShowRemediesList(true);
    }
  }, [category, handleCategoryChange]);
  const categoryRemedies = selectedCategory
    ? filteredRemedies.filter(
        (remedy) =>
          remedy.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : filteredRemedies;

  const symptomFilteredRemedies = categoryRemedies.filter((remedy) =>
    selectedSymptoms.some((symptom) => remedy.symptoms.includes(symptom))
  );

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
    setShowRemediesList(true);
  }

  function handleBackClick() {
    handleCategoryChange("");
    handleSymptomChange("all");
    handleSearchQuery("");
    setShowIcons(true);
    setShowBackButton(false);
    setShowSearchBar(true);
    setShowSymptomFilter(false);
    setShowDailyHealthTips(true);
    setShowRemediesList(false);
  }

  function handleSearchQueryInternal(event) {
    const value = event.currentTarget.value;
    handleSearchQuery(value);

    setShowIcons(value === "" ? true : false);
    setShowRemediesList(value === "" ? false : true);
    setShowDailyHealthTips(false);
  }
  function handleClearSearchBar() {
    handleSearchQuery("");
    setShowIcons(true);
    setShowDailyHealthTips(true);
    setShowRemediesList(false);
  }

  return (
    <>
      {showRemediesList && <Subheader selectedCategory={selectedCategory} />}
      <SearchBar
        handleSearchQuery={handleSearchQueryInternal}
        handleClearSearchBar={handleClearSearchBar}
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
        selectedSymptoms={selectedSymptoms}
        showSymptomFilter={showSymptomFilter}
      />
      {showRemediesList && (
        <RemediesList
          remedies={symptomFilteredRemedies}
          selectedCategory={selectedCategory}
        />
      )}
      <CategoriesBackButton
        handleBackClick={handleBackClick}
        showBackButton={showBackButton}
      />
      <StyledLinks href="/remedy/add">Add Remedy</StyledLinks> <br />
      <DailyHealthTips showDailyHealthTips={showDailyHealthTips} />
      <StyledLinks $variant="bookmarked" href="/favorites">
        View Bookmarked remedies
      </StyledLinks>
    </>
  );
}
