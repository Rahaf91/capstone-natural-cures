import RemediesList from "@/components/RemediesList";
import { StyledLinks } from "@/components/StyledLinks";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function FavoritePage({
  handleToggleFavorite,
  // remedies
}) {
  // const favoriteRemedies = remedies.filter((remedy) => remedy.isFavorite);

  const [favoriteRemedies, setFavoriteRemedies] = useState([]);

  useEffect(() => {
    async function fetchFavorites() {
      const response = await fetch("/api/user/favorites");
      const data = await response.json();
      setFavoriteRemedies(data);
    }
    fetchFavorites();
  }, []);

  return (
    <>
      <main>
        <h1>Your Favorite Remedies</h1>
        <BackButtonContainer>
          <StyledLinks $variant="back" href="/">
            &larr; Back
          </StyledLinks>
        </BackButtonContainer>
        {favoriteRemedies.length > 0 ? (
          <RemediesList
            remedies={favoriteRemedies}
            handleToggleFavorite={handleToggleFavorite}
          />
        ) : (
          <p>You have no favorite remedies.</p>
        )}
      </main>
    </>
  );
}

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  display: flex;
  width: 100%;
`;
