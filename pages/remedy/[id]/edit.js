import { useRouter } from "next/router";
import RemedyForm from "@/components//RemedyForm";
import Link from "next/link";
import { StyledLinks } from "@/components/StyledLinks";

export default function RemedyEditPage({ remedies, handleEditRemedy }) {
  const router = useRouter();
  const { id } = router.query;

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  function handleEditRemedyAndRedirect(updatedRemedy) {
    handleEditRemedy(id, updatedRemedy);
    router.push(`/remedy/${id}`);
  }

  return (
    <>
      <h1>{currentRemedy.title}</h1>
      <RemedyForm
        onEditRemedy={handleEditRemedyAndRedirect}
        isEditMode={true}
        defaultData={currentRemedy}
      />
      <StyledLinks href={`/remedy/${id}`}>Go Back</StyledLinks>
    </>
  );
}
