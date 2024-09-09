import RemedyForm from "@/components/RemedyForm";

export default function AddRemedyPage({ handleAddRemedy }) {
  return (
    <>
      <h1>Add New Remedy</h1>
      <RemedyForm onAddRemedy={handleAddRemedy} />
    </>
  );
}
