import Image from "next/image";
import styled from "styled-components";

export default function RemediesList({ remedies }) {
  return (
    <>
      <GridContainer>
        {remedies.map((remedy) => (
          <RemedyCard key={remedy.id}>
            <StyledImage
              src={remedy.imageUrl}
              alt={remedy.title}
              width={250}
              height={250}
            />
            <h2>{remedy.title}</h2>
            <h3>Symptoms</h3>
            <ul>
              {remedy.symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
          </RemedyCard>
        ))}
      </GridContainer>
    </>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  gap: 1rem;
  padding: 1rem;
`;

const RemedyCard = styled.section`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StyledImage = styled(Image)`
  object-fit: cover;
`;
