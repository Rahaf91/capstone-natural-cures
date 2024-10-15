import styled from "styled-components";
import Image from "next/image";
export default function SearchBar({
  handleSearchQuery,
  handleClearSearchBar,
  searchQuery,
}) {
  function onSearchChange(event) {
    const searchQuery = event.target.value;
    handleSearchQuery({ currentTarget: { value: searchQuery } });
  }

  return (
    <SearchBarWrapper>
      <Image src="/search.svg" alt="heart icon" width={30} height={30} />
      <VisuallyHiddenLabel htmlFor="searchInput">
        Search remedies
      </VisuallyHiddenLabel>
      <SearchBarField
        id="searchInput"
        type="text"
        value={searchQuery}
        placeholder="Search remedies"
        aria-label="Search"
        onChange={onSearchChange}
      />
      {searchQuery && (
        <ClearButton type="button" onClick={handleClearSearchBar}>
          Clear
        </ClearButton>
      )}
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  width: 150px;
  height: 30px;
  border-radius: 10px;
  // border: 2px solid #86895d;
  //background-color: #f8fbca;
  box-shadow: 1px 1px 10px black;
  font-size: 0.8rem;
  padding-left: 3px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const SearchBarField = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  height: 100%;
  padding: 0 5px;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0 5px;
  margin-top: 2px;
  margin-bottom: 2px;
`;
