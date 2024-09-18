import styled from "styled-components";
import symptoms from "../assets/symptoms.json";
import { StyledButton } from "./StyledButtons";

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
          <StyledButton variant="remove" onClick={handleClearFilter}>
            Remove Filter
          </StyledButton>
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
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--card-background);
`;

const FilterOption = styled.option`
  color: var(--text-color);
`;
