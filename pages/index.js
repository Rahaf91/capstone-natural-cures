import RemediesList from "@/components/RemediesList";
import RemedyForm from "@/components/RemedyForm";
import Link from "next/link";

export default function HomePage({
  remedies,
  handleAddRemedy,
  handleToggleFavorite,
}) {
  return (
    <>
      <h1>Natural Cures</h1>
      <RemedyForm onAddRemedy={handleAddRemedy} />
      <Link href="/favorites">View Bookmarked remedies</Link>
      {remedies.length === 0 ? (
        <p>You have no remedies left! Please add new remedies</p>
      ) : (
        <RemediesList
          remedies={remedies}
          handleToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}
