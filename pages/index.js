import RemediesList from "@/components/RemediesList";

export default function HomePage({ remedies }) {
  return (
    <>
      <h1>Natural Cures</h1> <RemediesList remedies={remedies} />
    </>
  );
}
