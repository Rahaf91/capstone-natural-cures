import { useRouter } from "next/router";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import ModalDelete from "@/components/ModalDelete.js";
import styled from "styled-components";
import { StyledLinks } from "@/components/StyledLinks";

export default function RemedyDetailsPage({
  remedies,
  handleDeleteRemedy,
  handleToggleFavorite,
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
      <StyledImage
        src={currentRemedy.imageUrl}
        alt={currentRemedy.title}
        width={250}
        height={250}
      />
      <FavoriteButton
        isFavorite={currentRemedy.isFavorite}
        handleToggleFavorite={() => handleToggleFavorite(id)}
      />
      <Section>
        <h2>Information</h2>
        <Subtitle>Ingredients:</Subtitle>
        <List>
          {currentRemedy.ingredients.map((ingredient, index) => (
            <ListItem key={index}>{ingredient}</ListItem>
          ))}
        </List>
      </Section>
      <Section>
        <Subtitle>Preparation:</Subtitle>
        <Text>{currentRemedy.preparation}</Text>
      </Section>
      <Section>
        <Subtitle>Usage:</Subtitle>
        <Text>{currentRemedy.usage}</Text>
      </Section>
      <Section>
        <Subtitle>Symptoms:</Subtitle>
        <List>
          {currentRemedy.symptoms.map((symptom, index) => (
            <ListItem key={index}>{symptom}</ListItem>
          ))}
        </List>
      </Section>
      <ModalDelete
        onDelete={() => {
          handleDelete(id);
        }}
      />

      <StyledLinks $variant="edit" href={`/remedy/${id}/edit`}>
        Edit Remedy
      </StyledLinks>
      <StyledLinks $variant="back" href="/">
        &larr; Back
      </StyledLinks>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8fbca;
  color: #54582f;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #54582f;
  text-align: center;
`;

const StyledImage = styled(Image)`
  display: block;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Section = styled.section`
  margin-top: 5px;
`;

const Subtitle = styled.h3`
  font-size: 1.4rem;
  color: #86895d;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #54582f;
  line-height: 1.6;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  font-size: 1rem;
  color: #54582f;
  margin-bottom: 5px;
`;
