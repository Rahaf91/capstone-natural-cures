import { useState, useEffect } from "react";
import styled from "styled-components";
import remediesData from "../assets/remedies.json";

export default function SymptomFilter({
  category,
  handleSymptomChange,
  showSymptomFilter,
  selectedSymptoms,
}) {
  const [filteredSymptoms, setFilteredSymptoms] = useState([]);
  const [selectedSymptom, setSelectedSymptom] = useState(selectedSymptoms);

  useEffect(() => {
    if (selectedSymptoms.length > 1) {
      setSelectedSymptom("Select a symptom");
    } else {
      setSelectedSymptom(selectedSymptoms[0]);
    }
  }, [selectedSymptoms]);

  useEffect(() => {
    const remediesInCategory = remediesData.filter(
      (remedy) => remedy.category === category
    );

    const allSymptoms = Array.from(
      new Set(remediesInCategory.flatMap((remedy) => remedy.symptoms))
    );
    setFilteredSymptoms(allSymptoms);
  }, [category]);

  return (
    <>
      {showSymptomFilter && (
        <DropdownSection>
          <DropdownSelect
            id="options"
            name="options"
            value={selectedSymptom}
            onChange={handleSymptomChange}
            aria-label="Select an option"
          >
            <DropdownOption value="all">Select a symptom</DropdownOption>
            <DropdownOption value="all">All</DropdownOption>
            {filteredSymptoms.map((symptom, index) => (
              <DropdownOption key={index} value={symptom}>
                {symptom}
              </DropdownOption>
            ))}
          </DropdownSelect>
        </DropdownSection>
      )}
    </>
  );
}

const DropdownSection = styled.section`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const DropdownSelect = styled.select`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  background-color: var(--card-background);
`;

const DropdownOption = styled.option`
  color: var(--text-color);
`;
