import RemedyForm from "@/components/RemedyForm";
import { StyledLinks } from "@/components/StyledLinks";
export default function AddRemedyPage({ handleAddRemedy }) {
  return (
    <>
      <h1>Add New Remedy</h1>
      <StyledLinks $variant="back" href="/">
        &larr; Back
      </StyledLinks>
      <RemedyForm onAddRemedy={handleAddRemedy} />
    </>
  );
}
