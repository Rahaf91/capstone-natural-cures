import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import dailyHealthTips from "@/assets/dailyhealthtips.json";
import { useEffect } from "react";

export default function DailyHealthTips() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const randomTip = Math.floor(Math.random() * dailyHealthTips.length);
    setCurrentTipIndex(randomTip);
  }, []);

  if (!dailyHealthTips || dailyHealthTips.length === 0) {
    return <p>Loading...</p>;
  }

  const currentTip = dailyHealthTips[currentTipIndex];

  function handleNextTip() {
    let nextIndex = currentTipIndex + 1;
    if (nextIndex >= dailyHealthTips.length) {
      nextIndex = 0;
    }
    setCurrentTipIndex(nextIndex);
  }

  function handlePreviousTip() {
    let previousIndex = currentTipIndex - 1;
    if (previousIndex < 0) {
      previousIndex = dailyHealthTips.length - 1;
    }
    setCurrentTipIndex(previousIndex);
  }

  return (
    <CarouselWrapper>
      <Button onClick={handlePreviousTip}>
        <ArrowImage
          src="/left-arrow.svg"
          width={40}
          height={40}
          alt="Previous tip"
        />
      </Button>

      <Tip>
        <h3>{currentTip.title}</h3>
        <ImageWrapper>
          <StyledImage
            src={currentTip.imageUrl}
            layout="fill"
            objectFit="cover"
            alt={currentTip.title}
          />
        </ImageWrapper>
        <p>{currentTip.description}</p>
      </Tip>

      <Button onClick={handleNextTip}>
        <ArrowImage
          src="/right-arrow.svg"
          width={40}
          height={40}
          alt="Next tip"
        />
      </Button>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--box-shadow);
  width: 100%;
  max-width: 800px;
  height: 45vh;
  border-radius: var(--border-radius);
  @media (max-width: 600px) {
    height: 65vh;
  }
`;

const Tip = styled.div`
  font-size: 1rem;
  color: #54582f;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 30vh;
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    height: 40vh;
  }
`;
const StyledImage = styled(Image)`
  border-radius: var(--border-radius);
`;
const ArrowImage = styled(Image)`
  @media (max-width: 600px) {
    width: 45px;
    height: 45px;
  }
`;
