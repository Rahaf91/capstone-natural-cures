import RemediesList from "@/components/RemediesList";
import { StyledLinks } from "@/components/StyledLinks";
import styled from "styled-components";
import Image from "next/image";
export default function FavoritePage({ handleToggleFavorite, remedies }) {
  const favoriteRemedies = remedies.filter((remedy) => remedy.isFavorite);

  return (
    <>
      <FavoritesContainer>
        <h1>Your Favorite Remedies</h1>
        <BackButtonContainer>
          <StyledLinks $variant="back" href="/">
            <Image src="/back.svg" alt="back icon" width={60} height={60} />
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
      </FavoritesContainer>
    </>
  );
}

const BackButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  @media (max-width: 600px) {
    left: -1rem;
  }
`;

const FavoritesContainer = styled.div`
  border-radius: var(--border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 50%;
  box-shadow: var(--box-shadow);
  position: relative;
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0;
    padding: 0 1rem;
    box-shadow: none;
  }
`;
