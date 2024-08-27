export default function FilterList() {
  return (
    <>
      <ul>
        {symptoms.map((symptom) => (
          <li key={symptom} onClick={() => onSelect(symptom)}>
            {symptom}
          </li>
        ))}
      </ul>
      <ul>
        {selectedSymptoms.length !== 0 && (
          <>
            {selectedSymptoms.map((selectedSymptom) => (
              <li
                key={selectedSymptom}
                onClick={() => onDeselect(selectedSymptom)}
              >
                {selectedSymptom} X
              </li>
            ))}
            <button type="button" onClick={onClear}>
              Clear
            </button>
          </>
        )}
      </ul>
    </>
  );
}
