import { useState } from "react";
import styled from "styled-components";

export default function SearchBar({ handleSearch, handleClearSearchBar }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchChange(event) {
    const query = event.target.value;
    setSearchQuery(event.target.value);
    handleSearch(query);
  }

  return (
    <SearchBarWrapper>
      <input
        type="text"
        placeholder="Search remedies"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {searchQuery && (
        <button
          onClick={() => {
            setSearchQuery("");
            handleClearSearchBar();
          }}
        >
          Clear Search
        </button>
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

  input {
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 5px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0 5px;
  }
`;
