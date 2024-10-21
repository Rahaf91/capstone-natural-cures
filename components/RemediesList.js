import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";
import { StyledLinks } from "./StyledLinks";

export default function RemediesList({ remedies, handleToggleFavorite }) {
  return (
    <RemedyContainer>
      {remedies.map((remedy) => (
        <RemedyCard key={remedy._id}>
          <ImageWrapper>
            <StyledImage
              src={remedy.imageUrl}
              alt={remedy.title}
              layout="fill"
              objectFit="cover"
            />
          </ImageWrapper>
          <FavoriteButton
            isFavorite={remedy.isFavorite}
            handleToggleFavorite={() =>
              handleToggleFavorite(remedy._id, remedy.isFavorite)
            }
          />

          <h2>{remedy.title}</h2>
          <h3>Symptoms:</h3>
          <ul>
            {remedy.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>

          <ViewRecipeButton href={`/remedy/${remedy._id}`} $variant="view">
            View Recipe
          </ViewRecipeButton>
        </RemedyCard>
      ))}
    </RemedyContainer>
  );
}
const RemedyContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const RemedyCard = styled.section`
  border-radius: 1rem;
  background-color: var(--background-color);
  box-shadow: var(--header-card-box-shadow);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 600px;
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0.5rem 0;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  overflow: hidden;

  @media (max-width: 600px) {
    height: 200px;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;
const ViewRecipeButton = styled(StyledLinks)`
  @media (max-width: 600px) {
    width: 40%;
    padding: 0.4rem;
  }
`;
