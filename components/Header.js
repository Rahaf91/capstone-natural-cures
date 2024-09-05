import Image from "next/image";
import styled from "styled-components";

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo>
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </Logo>
      <Title>Natural Cures</Title>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: var(--background-color);
  box-shadow: var(--box-shadow);
  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

const Logo = styled.div`
  @media (max-width: 600px) {
    margin-left: 0;
    margin-bottom: -1.5rem;
    transform: translateY(-3px);
  }
`;
