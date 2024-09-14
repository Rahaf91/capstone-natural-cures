import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import FavoriteButton from "@/components/FavoriteButton";
import DeleteButtonConfirmation from "@/components/DeleteButtonConfirmation";
import styled from "styled-components";
import Notes from "@/components/Notes";
import ReviewForm from "@/components/ReviewForm";
import StarRating from "@/components/StarRating";

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

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const storedReviews = localStorage.getItem(`reviews-${id}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`reviews-${id}`, JSON.stringify(reviews));
  }, [reviews, id]);

  if (!currentRemedy) {
    return <p>...loading</p>;
  }

  function handleDelete(id) {
    handleDeleteRemedy(id);
    router.push("/");
  }

  function handleReviewSubmit(review) {
    setReviews([...reviews, review]);
  }

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length ||
    0;

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
      <h2>Average Rating: {Math.round(averageRating)} / 5 stars</h2>
      <ReviewForm onReviewSubmit={handleReviewSubmit} />
      <Reviews>
        {reviews.map((review, index) => (
          <Review key={index}>
            <StarRating rating={review.rating} onRatingChange={() => {}} />
            <p>{review.reviewText}</p>
          </Review>
        ))}
      </Reviews>
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

const Reviews = styled.div`
  margin-top: 2rem;
`;

const Review = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
`;
