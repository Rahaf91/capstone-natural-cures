import { useState } from "react";
import styled from "styled-components";

export default function StarRating({ rating, onRatingChange }) {
  const [hover, setHover] = useState(0);

  return (
    <Stars>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <Star
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => onRatingChange(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </Star>
        );
      })}
    </Stars>
  );
}

const Stars = styled.div`
  display: flex;
  flex-direction: row;
`;

const Star = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  &.on .star {
    color: gold;
  }
  &.off .star {
    color: grey;
  }
`;
