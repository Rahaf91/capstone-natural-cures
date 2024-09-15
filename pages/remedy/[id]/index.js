import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import DeleteButtonConfirmation from "@/components/DeleteButtonConfirmation";
import styled from "styled-components";
import Notes from "@/components/Notes";
import React from "react";

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

  // Überprüfen, ob die remedies-Daten korrekt geladen sind
  if (!remedies || remedies.length === 0) {
    return <p>...loading</p>;
  }

  const currentRemedy = remedies.find((remedy) => remedy.id === id);

  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  function handleDelete(id) {
    handleDeleteRemedy(id);
    router.push("/");
  }

  console.log("Current Remedy:", currentRemedy); // Debugging
  console.log("Video URL:", currentRemedy.videoUrlPreparation); // Debugging

  const currentVideo = currentRemedy.videoUrlPreparation;

  return (
    <>
      <h1>{currentRemedy.title}</h1>
      <Image
        src={currentRemedy.imageUrl}
        alt={currentRemedy.title}
        width={250}
        height={250}
      />
      <FavoriteButton
        isFavorite={currentRemedy.isFavorite}
        handleToggleFavorite={() => handleToggleFavorite(id)}
      />
      <h2>Information</h2>
      <h3>Ingredients:</h3>
      <ul>
        {currentRemedy.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Preparation:</h3>
      <p>{currentRemedy.preparation}</p>
      <h3>Usage:</h3>
      <p>{currentRemedy.usage}</p>
      <h3>Symptoms:</h3>
      <ul>
        {currentRemedy.symptoms.map((symptom, index) => (
          <li key={index}>{symptom}</li>
        ))}
      </ul>
      <h3>Preparation Video:</h3>
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
        <p>No video available</p>
      )}

      <DeleteButtonConfirmation
        onDelete={() => {
          handleDelete(id);
        }}
      />
      <StyledLink href={`/remedy/${id}/edit`}>Edit Remedy</StyledLink>
      <Notes
        onAddNote={handleAddNotes}
        onEditNote={handleEditNotes}
        currentRemedy={currentRemedy}
        onDeleteNote={handleDeleteNote}
      />
      <Link href="/"> &larr; Back</Link>
    </>
  );
}

const StyledLink = styled(Link)`
  background-color: rgba(84, 88, 47, 0.9);
  color: white;
  text-decoration: none;
  padding: 1rem;
  margin-left: 1rem;
`;

const VideoContainer = styled.div`
  margin-top: 2rem;
  iframe {
    width: 100%;
    max-width: 560px;
    height: 315px;
  }
`;
