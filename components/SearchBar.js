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
        Search Remedies
      </VisuallyHiddenLabel>
      <SearchBarField
        id="searchInput"
        type="text"
        value={searchQuery}
        placeholder="search remedies"
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
  width: var(--width);
  height: var(--height);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  padding-left: var(--padding);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 50%;
  }
`;

const VisuallyHiddenLabel = styled.label`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;

  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
`;

const SearchBarField = styled.input`
  color: var(--text-color);
  font-size: 1rem;
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  height: 100%;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0 var(--padding);
  margin: 0.2rem 0;
`;
