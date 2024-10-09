import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function Header() {
  return (
    <HeaderWrapper>
      <LogoContainer>
        <Image src="/logo.svg" alt="Logo" width={75} height={75} />
        <Title>Natural Cures</Title>
      </LogoContainer>
      <LinksContainer>
        <StyledLink href="/favorites">View Bookmarked Remedies</StyledLink>
        <StyledLink href="/remedy/add">Add Remedy</StyledLink>
      </LinksContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.25rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  margin-left: 0.5rem;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:hover {
    text-decoration: underline;
  }
`;
