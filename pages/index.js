import RemediesList from "@/components/RemediesList";

export default function HomePage({ remedies }) {
  return (
    <>
      <h1>Natural Cures</h1>

      {remedies.length === 0 ? (
        <p>You have no remedies left! Please add new remedies</p>
      ) : (
        <RemediesList remedies={remedies} />
      )}
    </>
  );
}
