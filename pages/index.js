import DailyHealthTips from "@/components/DailyHealthTips";
import SearchBar from "@/components/SearchBar";
import RemediesList from "@/components/RemediesList";
import Categories from "@/components/Categories";
import Navbar from "../components/Navbar";

export default function HomePage({
  remedies,
  handleSearchQuery,
  searchQuery,
  handleToggleFavorite,
}) {
  return (
    <>
      <Navbar />
      <SearchBar
        handleSearchQuery={handleSearchQuery}
        handleClearSearchBar={() =>
          handleSearchQuery({ currentTarget: { value: "" } })
        }
        searchQuery={searchQuery}
      />
      <DailyHealthTips />

      {remedies && <Categories showIcons={true} remedies={remedies} />}

      {searchQuery && remedies.length > 0 && (
        <RemediesList
          handleToggleFavorite={handleToggleFavorite}
          remedies={remedies}
        />
      )}
    </>
  );
}
