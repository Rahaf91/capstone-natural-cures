import Image from "next/image";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";
import { StyledLinks } from "./StyledLinks";

export default function RemediesList({
  remedies,
  handleToggleFavorite,
  selectedCategory,
}) {
  if (remedies.length === 0 && selectedCategory) {
    return (
      <NoRemediesMessage>
        Sorry, no remedies were found for this health issue.
      </NoRemediesMessage>
    );
  }

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
            isDetailPage={false}
          />
          <ContentWrapper>
            <h2>{remedy.title}</h2>
            <h3>Symptoms:</h3>
            <ul>
              {remedy.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </ContentWrapper>
          <StyledLinks href={`/remedy/${remedy.id}`} $variant="view">
            View Recipe
          </StyledLinks>
        </RemedyCard>
      ))}
    </>
  );
}

const NoRemediesMessage = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: var(--text-color);
  margin-top: 2rem;
`;

const RemedyCard = styled.section`
  width: 100%;
  border-radius: 1rem;
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;

  @media (max-width: 600px) {
    max-width: 90%;
    margin: 0.5rem auto;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
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

const ContentWrapper = styled.div`
  padding: 1rem;

  h2 {
    font-size: 1.5rem;
    color: var(--text-color);
    font-family: var(--font-capriola);
  }

  h3 {
    font-size: 1.125rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
    font-family: var(--font-capriola);
  }

  ul {
    font-size: 0.9rem;
    padding-left: 1.5rem;
    color: var(--text-color);
    font-family: var(--font-capriola);
  }

  @media (max-width: 600px) {
    padding: 0.75rem;

    h2 {
      font-size: 1.3rem;
    }

    h3 {
      font-size: 1rem;
    }

    ul {
      font-size: 0.85rem;
    }
  }
`;
