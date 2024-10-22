import styled from "styled-components";
import { StyledButton } from "./StyledButtons";
import Image from "next/image";
export default function FilterList({
  symptoms,
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
          <FilterOption value="" disabled>
            Filter by Symptoms
          </FilterOption>
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
  gap: 0.5rem;
  height: var(--height);
  justify-content: center;
  @media (max-width: 600px) {
    width: 50%;
  }
`;
const FilterSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--card-background);
  width: var(--width);
`;

const FilterOption = styled.option`
  color: var(--text-color);
`;
