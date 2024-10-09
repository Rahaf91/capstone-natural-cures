import RemediesList from "@/components/RemediesList";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FavoritePage({ handleToggleFavorite, remedies }) {
  const favoriteRemedies = remedies.filter((remedy) => remedy.isFavorite);
  const router = useRouter();

  function isLoggedIn() {
    return !!localStorage.getItem("userToken");
  }

  function handleToggleFavoriteClick(remedyId) {
    if (!isLoggedIn()) {
      router.push("/login"); // Zur Login-Seite weiterleiten
    } else {
      handleToggleFavorite(remedyId);
    }
  }

  return (
    <>
      <main>
        <h1>Your Favorite Remedies</h1>
        {favoriteRemedies.length > 0 ? (
          <RemediesList
            remedies={favoriteRemedies}
            handleToggleFavorite={(id) => handleToggleFavoriteClick(id)}
          />
        ) : (
          <p>You have no favorite remedies.</p>
        )}
      </main>

      <Link href="/">Go back to page</Link>
    </>
  );
}
