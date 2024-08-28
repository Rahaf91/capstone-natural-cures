import symptoms from "../assets/symptoms.json";
import Link from "next/link";

export default function FilterList({
  selectedSymptom,
  handleSymptomChange,
  handleClearFilter,
}) {
  return (
    <>
      <section>
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
