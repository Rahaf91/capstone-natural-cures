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

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  function handleDelete(id) {
    handleDeleteRemedy(id);
    router.push("/");
  }

  return (
    <Container>
      <Title>{currentRemedy.title}</Title>
      <ImageWrapper>
        <StyledImage
          src={currentRemedy.imageUrl}
          alt={currentRemedy.title}
          width={250}
          height={250}
        />
        <FavoriteButton
          isFavorite={currentRemedy.isFavorite}
          isDetailPage={true}
          handleToggleFavorite={() => handleToggleFavorite(id)}
        />
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
      <DeleteButtonConfirmation
        onDelete={() => {
          handleDelete(id);
        }}
      />
      <ButtonContainer>
        <StyledLinks $variant="edit" href={`/remedy/${id}/edit`}>
          Edit Remedy
        </StyledLinks>
      </ButtonContainer>
      <Notes
        onAddNote={handleAddNotes}
        onEditNote={handleEditNotes}
        currentRemedy={currentRemedy}
        onDeleteNote={handleDeleteNote}
      />
      <BackButtonContainer>
        <StyledLinks $variant="back" href="/">
          &larr; Back
        </StyledLinks>
      </BackButtonContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  padding: 1rem;
  color: #54582f;
  box-shadow: 0 1rem 5rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  background-color: var(--background-color);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: #54582f;
  text-align: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const StyledImage = styled(Image)`
  display: block;
  margin: 1rem auto;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
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
  margin-left: 1rem;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  margin-left: 1rem;
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
  justify-content: flex-end;
  display: flex;
  width: 100%;
`;
