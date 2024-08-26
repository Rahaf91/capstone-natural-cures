import { useRouter } from "next/router";
import EditRemedyForm from "@/components/EditRemedyForm/EditRemedyForm";
import Link from "next/link";

export default function RemedyEditPage({ remedies, handleEditRemedy }) {
  const router = useRouter();
  const { id } = router.query;

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  function handleSave(updatedRemedy) {
    handleEditRemedy(id, updatedRemedy);
    router.push(`/remedy/${id}`);
  }

  return (
    <>
      <h1>{currentRemedy.title}</h1>
      <EditRemedyForm remedy={currentRemedy} onSave={handleSave} />
      <Link href={`/remedy/${id}`}>Go Back</Link>
    </>
  );
}