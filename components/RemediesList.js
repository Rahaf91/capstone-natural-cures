import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "./FavoriteButton";
import SearchBar from "./SearchBar";

export default function RemediesList({
  remedies,
  handleToggleFavorite,
  handleSearchQuery,
  searchQuery,
}) {
  return (
    <>
      <SearchBar
        handleSearchQuery={handleSearchQuery}
        handleClearSearchBar={() =>
          handleSearchQuery({ currentTarget: { value: "" } })
        }
        searchQuery={searchQuery}
      />
      <GridContainer>
        {remedies.map((remedy) => (
          <RemedyCard key={remedy.id}>
            <ImageWrapper>
              <StyledImage
                src={remedy.imageUrl}
                alt={remedy.title}
                width={250}
                height={250}
              />
              <FavoriteButton
                isFavorite={remedy.isFavorite}
                handleToggleFavorite={() => handleToggleFavorite(remedy.id)}
              />
            </ImageWrapper>
            <h2>{remedy.title}</h2>
            <h3>Symptoms</h3>
            <ul>
              {remedy.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
            <Link href={`/remedy/${remedy.id}`}>View Recipe</Link>
          </RemedyCard>
        ))}
      </GridContainer>
    </>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const RemedyCard = styled.section`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;
