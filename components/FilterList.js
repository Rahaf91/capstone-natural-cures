/*import symptoms from "../assets/symptoms.json";
import Link from "next/link";

export default function FilterList({
  selectedSymptom,
  handleSymptomChange,
  handleClearFilter,
}) {
  return (
    <>
      <section>
        <label htmlFor="symptoms" aria-label="Filter by Symptoms"></label>
        <select
          id="symptoms"
          name="symptoms"
          value={selectedSymptom}
          onChange={handleSymptomChange}
        >
          <option value="">Filter by Symptom</option>
          {symptoms.map((symptom, index) => (
            <option key={index} value={symptom}>
              {symptom}
            </option>
          ))}
        </select>

        {selectedSymptom && (
          <button onClick={handleClearFilter}>Remove Filter</button>
        )}
      </section>
      <Link href="/"></Link>
    </>
  );
}
*/

import styled from "styled-components";
import symptoms from "../assets/symptoms.json";

export default function FilterList({
  selectedSymptom,
  handleSymptomChange,
  handleClearFilter,
}) {
  return (
    <>
      <FilterSection>
        <FilterSelect
          id="symptoms"
          name="symptoms"
          value={selectedSymptom}
          onChange={handleSymptomChange}
          aria-label="Filter by Symptoms"
        >
          <FilterOption value="">Filter by Symptom</FilterOption>
          {symptoms.map((symptom, index) => (
            <FilterOption key={index} value={symptom}>
              {symptom}
            </FilterOption>
          ))}
        </FilterSelect>

        {selectedSymptom && (
          <ClearButton onClick={handleClearFilter}>Remove Filter</ClearButton>
        )}
      </FilterSection>
    </>
  );
}

const FilterSection = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const FilterSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--card-background);
`;

const FilterOption = styled.option`
  color: var(--text-color);
`;

const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: var(--background-color-button);
  color: var(--color-button);
  border-radius: var(--border-radius);
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #6d7250;
  }

  &:focus {
    outline: none;
    box-shadow: var(--box-shadow);
  }
`;
