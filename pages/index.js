import RemediesList from "@/components/RemediesList";
import RemedyForm from "@/components/RemedyForm";
export default function HomePage({ remedies, handleAddRemedy }) {
  return (
    <>
      <h1>Natural Cures</h1>
      <RemedyForm onAddRemedy={handleAddRemedy} />
      <RemediesList remedies={remedies} />
    </>
  );
}
