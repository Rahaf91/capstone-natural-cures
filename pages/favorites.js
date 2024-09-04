import RemediesList from "@/components/RemediesList";

import { StyledLinks } from "@/components/StyledLinks";
export default function FavoritePage({ handleToggleFavorite, remedies }) {
  const favoriteRemedies = remedies.filter((remedy) => remedy.isFavorite);

  return (
    <>
      <main>
        <h1>Your Favorite Remedies</h1>
        {favoriteRemedies.length > 0 ? (
          <RemediesList
            remedies={favoriteRemedies}
            handleToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <p>You have no favorite remedies.</p>
        )}
      </main>

      <StyledLinks href="/">Go back </StyledLinks>
    </>
  );
}
