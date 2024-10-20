import DailyHealthTips from "@/components/DailyHealthTips";
import SearchBar from "@/components/SearchBar";
import RemediesList from "@/components/RemediesList";
import Categories from "@/components/Categories";
import styled from "styled-components";
export default function HomePage({
  remedies,
  handleSearchQuery,
  searchQuery,
  handleToggleFavorite,
}) {
  return (
    <>
      <SearchBar
        handleSearchQuery={handleSearchQuery}
        handleClearSearchBar={() =>
          handleSearchQuery({ currentTarget: { value: "" } })
        }
        searchQuery={searchQuery}
      />
      <DailyHealthTips />
      <Text>Where Do You Need Relief? Click To Find Out</Text>
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
const Text = styled.p`
  color: var(--text-color);
  font-weight: bold;
  text-align: center;
  @media (max-width: 600px) {
    max-width: 70%;
  }
`;
