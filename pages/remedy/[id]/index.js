import { useRouter } from "next/router";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import DeleteButtonConfirmation from "@/components/DeleteButtonConfirmation";
import styled from "styled-components";
import { StyledLinks } from "@/components/StyledLinks";
import Notes from "@/components/Notes";

export default function RemedyDetailsPage({
  remedies,
  handleDeleteRemedy,
  handleToggleFavorite,
  handleAddNotes,
  handleEditNotes,
  handleDeleteNote,
}) {
  const router = useRouter();
  const { id } = router.query;

  if (!remedies || remedies.length === 0) {
    return <p>...loading</p>;
  }

  const currentRemedy = remedies.find((remedy) => remedy._id === id);
  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  function handleDelete(id) {
    handleDeleteRemedy(id);
    const category = currentRemedy.category;
    router.push(`/categories/${category}`);
  }

  function handlePrint() {
    window.print();
  }

  const currentVideo = currentRemedy.videoUrlPreparation;

  return (
    <>
      <Container>
        <BackButtonContainer className="no-print">
          <StyledLinks
            $variant="back"
            href={`/categories/${currentRemedy.category}`}
          >
            <Image src="/back.svg" alt="back icon" width={60} height={60} />
          </StyledLinks>
          <PrintButton onClick={handlePrint} className="no-print">
            <Image src="/print.svg" alt="print icon" width={70} height={70} />
          </PrintButton>
        </BackButtonContainer>

        <h1>{currentRemedy.title}</h1>
        <ImageWrapper>
          <StyledImage
            src={currentRemedy.imageUrl}
            alt={currentRemedy.title}
            width={250}
            height={250}
          />
          <div className="no-print">
            <FavoriteButton
              isFavorite={currentRemedy.isFavorite}
              handleToggleFavorite={() =>
                handleToggleFavorite(
                  currentRemedy._id,
                  currentRemedy.isFavorite
                )
              }
            />
          </div>
        </ImageWrapper>
        <Section>
          <Subtitle>Ingredients</Subtitle>
          <List>
            {currentRemedy.ingredients.map((ingredient, index) => (
              <ListItem key={index}>{ingredient}</ListItem>
            ))}
          </List>
        </Section>
        <Section>
          <Subtitle>Preparation</Subtitle>
          <Text>{currentRemedy.preparation}</Text>
        </Section>
        <Section>
          <Subtitle>Usage</Subtitle>
          <Text>{currentRemedy.usage}</Text>
        </Section>
        <Section>
          <Subtitle>Symptoms</Subtitle>
          <List>
            {currentRemedy.symptoms.map((symptom, index) => (
              <ListItem key={index}>{symptom}</ListItem>
            ))}
          </List>
        </Section>
        <div className="no-print">
          <Section>
            <Subtitle>Preparation Video</Subtitle>
            {currentVideo ? (
              <VideoContainer>
                <iframe
                  width="560"
                  height="315"
                  src={currentVideo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </VideoContainer>
            ) : (
              <PlaceholderContainer>
                <p>Sorry, the video is not available at the moment.</p>
              </PlaceholderContainer>
            )}
          </Section>
        </div>

        <EditDeleteContainer>
          <ButtonContainer className="no-print">
            <StyledLinks
              $variant="edit"
              href={`/remedy/${currentRemedy._id}/edit`}
            >
              Edit Remedy
            </StyledLinks>
          </ButtonContainer>
          <div className="no-print">
            <DeleteButtonConfirmation
              onDelete={() => handleDelete(currentRemedy._id)}
            />
          </div>
        </EditDeleteContainer>
      </Container>
      <NotesContainer>
        <h2>Personal Notes</h2>
        <Notes
          onAddNote={handleAddNotes}
          onEditNote={handleEditNotes}
          currentRemedy={currentRemedy}
          onDeleteNote={handleDeleteNote}
        />
      </NotesContainer>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 60rem;
  position: relative;
  margin: 0 auto;
  padding: 1rem;
  color: var(--text-color);
  box-shadow: var(--header-card-box-shadow);
  border-radius: 1rem;
  background-color: var(--background-color);
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 60%;
  height: 35vh;
  margin: 0 auto;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    width: 100%;
    height: 200px;
    max-width: 100%;
  }
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

const Section = styled.section`
  padding: 0.5rem;
  border-bottom: 1px solid #54582f;
`;

const Subtitle = styled.h3`
  font-size: 1.2rem;
`;

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin-left: 1.4rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 0.1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
`;

const PrintButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;
const VideoContainer = styled.div`
  margin: 0 auto;
  margin-top: 2rem;
  width: 100%;
  max-width: 60%;
  height: 35vh;
  iframe {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 200px;
    max-width: 100%;
  }
`;

const PlaceholderContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(84, 88, 47, 0.9);
  color: white;
  text-align: center;
`;
const EditDeleteContainer = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const NotesContainer = styled.div`
  background-color: var(--background-color);
  width: 100%;
  max-width: 60rem;
  box-shadow: var(--header-card-box-shadow);
  border-radius: 1rem;
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 2rem auto;
  }
`;
