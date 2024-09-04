import RemediesList from "@/components/RemediesList";

import { StyledLink } from "@/components/StyledLinks";
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

      <StyledLink href="/">Go back </StyledLink>
    </>
  );
}
