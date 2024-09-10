import styled from "styled-components";

export default function SearchBar({
  handleSearch,
  handleClearSearchBar,
  searchQuery,
}) {
  function handleSearchChange(event) {
    const query = event.target.value;
    handleSearch(query);
  }

  return (
    <SearchBarWrapper>
      <VisuallyHiddenLabel htmlFor="searchInput">
        Search remedies
      </VisuallyHiddenLabel>
      <SearchBarField
        id="searchInput"
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search remedies"
        aria-label="Search remedies"
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
  width: 130px;
  height: 27px;
  border-radius: 10px;
  border: 2px solid #86895d;
  background-color: #bec092;
  font-size: 0.8rem;
  padding-left: 10px;
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
