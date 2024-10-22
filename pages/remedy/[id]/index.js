import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import StarRating from "@/components/StarRating";
// import { useSession } from "next-auth/react";
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

  // const { data: session } = useSession();
  // const [remedy, setRemedy] = useState(null);
  // const [reviews, setReviews] = useState([]);

  // useEffect(() => {
  //   if (id) {
  //     fetchRemedy();
  //   }
  // }, [id]);

  // const fetchRemedy = async () => {
  //   try {
  //     const response = await fetch(`/api/remedies/${id}`);
  //     const data = await response.json();
  //     setRemedy(data);
  //     setReviews(data.reviews);
  //   } catch (error) {
  //     console.error("Error fetching remedy:", error);
  //   }
  // };

  // const handleReviewSubmit = async (rating, comment) => {
  //   try {
  //     const response = await fetch("/api/user", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ remedyId: id, rating, comment }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to submit review");
  //     }

  //     const updatedUser = await response.json();
  //     const newReview = updatedUser.reviews.find(
  //       (review) => review.remedyId === id && review.rating === rating && review.comment === comment
  //     );
  //     setReviews([...reviews, newReview]);
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //   }
  // };

  // const averageRating =
  //   reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

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
    <Container>
      <div className="no-print">
        <PrintButton onClick={handlePrint}>Print Remedy</PrintButton>
      </div>
      <Title>{currentRemedy.title}</Title>
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
            isDetailPage={true}
            handleToggleFavorite={() =>
              handleToggleFavorite(currentRemedy._id, currentRemedy.isFavorite)
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
      <div className="no-print">
        <DeleteButtonConfirmation
          onDelete={() => handleDelete(currentRemedy._id)}
        />
      </div>
      <ButtonContainer className="no-print">
        <StyledLinks $variant="edit" href={`/remedy/${currentRemedy._id}/edit`}>
          Edit Remedy
        </StyledLinks>
      </ButtonContainer>
      <Notes
        onAddNote={handleAddNotes}
        onEditNote={handleEditNotes}
        currentRemedy={currentRemedy}
        onDeleteNote={handleDeleteNote}
      />

      {/* <Subtitle>Average Rating: {Math.round(averageRating)} / 5 stars</Subtitle>
      {session && (
        <StarRating
          rating={0}
          onRatingChange={(rating) => handleReviewSubmit(rating, "")}
        />
      )}
      <ReviewSection>
        {reviews.map((review, index) => (
          <Review key={index}>
            <StarRating rating={review.rating} onRatingChange={() => {}} />
            <p>{review.comment}</p>
          </Review>
        ))}
      </ReviewSection> */}

      <BackButtonContainer className="no-print">
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
const PrintButton = styled.button`
  background-color: rgba(84, 88, 47, 0.9);
  color: white;
  border: none;
  padding: 1rem;
  margin-left: 1rem;
  cursor: pointer;
`;

const VideoContainer = styled.div`
  margin-top: 2rem;
  iframe {
    width: 100%;
    max-width: 560px;
    height: 315px;
  }
`;

const PlaceholderContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(84, 88, 47, 0.9);
  color: white;
  text-align: center;
`;

// const ReviewSection = styled.section`
//   margin-top: 2rem;
// font-size: 1rem;
// line-height: 1.6;
// margin-left: 1rem;
// `;

// const Review = styled.div`
// font-size: 1rem;
// line-height: 1.6;
// margin-left: 1rem;
//   border-bottom: 1px solid #ccc;
//   padding: 1rem 0;
// `;
