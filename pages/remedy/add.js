import RemedyForm from "@/components/RemedyForm";
import Link from "next/link";

export default function AddRemedyPage({ handleAddRemedy }) {
  return (
    <>
      <h1>Add New Remedy</h1>
      <RemedyForm onAddRemedy={handleAddRemedy} />
      <Link href="/">Go Back</Link>
    </>
  );
}
