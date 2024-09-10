import { useState, useEffect } from "react";
import styled from "styled-components";

export default function HealthTipsCarousel({ dailyhealthtips }) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    if (!dailyhealthtips || dailyhealthtips.length === 0) return;

    const interval = setInterval(() => {
      setCurrentTipIndex(
        (prevIndex) => (prevIndex + 1) % dailyhealthtips.length
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [dailyhealthtips]);

  if (!dailyhealthtips || dailyhealthtips.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <CarouselWrapper>
      <Tip>{dailyhealthtips[currentTipIndex]}</Tip>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8fbca;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Tip = styled.div`
  font-size: 1rem;
  color: #54582f;
`;
