import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";
import { StyledLinks } from "./StyledLinks";

export default function RemediesList({ remedies, handleToggleFavorite }) {
  return (
    <>
      {remedies.map((remedy) => (
        <RemedyCard key={remedy.id}>
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
            handleToggleFavorite={() => handleToggleFavorite(remedy.id)}
          />
          <h2>{remedy.title}</h2>
          <h3>Symptoms:</h3>
          <ul>
            {remedy.symptoms.map((symptom, index) => (
              <li key={index}>{symptom}</li>
            ))}
          </ul>
          <StyledLinks href={`/remedy/${remedy.id}`}>View Recipe</StyledLinks>
        </RemedyCard>
      ))}
    </>
  );
}

const RemedyCard = styled.section`
  width: 100%;
  border-radius: var(--border-radius);
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
  margin-bottom: 1rem;
  position: relative;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
`;
