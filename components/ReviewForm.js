import { useState } from "react";
import StarRating from "./StarRating";
import styled from "styled-components";

export default function ReviewForm({ onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const review = {
      rating,
      reviewText,
    };

    onReviewSubmit(review);
    setRating(0);
    setReviewText("");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <StarRating rating={rating} onRatingChange={setRating} />
      <textarea
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        placeholder="Write your review here"
        required
      />
      <button type="submit">Submit Review</button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
