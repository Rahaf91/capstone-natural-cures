import RemedyForm from "@/components/RemedyForm";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AddRemedyPage({ handleAddRemedy }) {
  const router = useRouter();

  function handleAddRemedyAndRedirect(newRemedy) {
    handleAddRemedy(newRemedy);
    router.push(`/`);
  }

  return (
    <>
      <h1>Add New Remedy</h1>
      <RemedyForm onAddRemedy={handleAddRemedyAndRedirect} />
      <Link href={`/`}>Go Back</Link>
    </>
  );
}
