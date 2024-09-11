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
        <Image
          src="/left-arrow.svg"
          width={24}
          height={24}
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
        <Image src="/right-arrow.svg" width={24} height={24} alt="Next tip" />
      </Button>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f8fbca;
  margin-bottom: 20px;
`;

const Tip = styled.div`
  font-size: 1rem;
  color: #54582f;
  text-align: center;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
  height: 250px;
`;
const StyledImage = styled(Image)`
  border-radius: 10px;
`;
