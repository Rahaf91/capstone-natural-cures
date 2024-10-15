import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <LogoContainer>
        <StyledImage src="/Logo.png" alt="Logo" height={200} width={200} />
      </LogoContainer>

      <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? (
          <Image
            src="/close-menu.svg"
            alt="Close Menu"
            width={50}
            height={50}
          />
        ) : (
          <Image src="/open-menu.svg" alt="Open Menu" width={50} height={50} />
        )}
      </MenuToggle>

      <LinksContainer $isOpen={isMenuOpen}>
        <StyledLink href="/favorites">
          <Image src="/heart.svg" alt="heart icon" width={30} height={30} />
          Favorite Remedies
        </StyledLink>

        <StyledLink href="/remedy/add">
          <Image src="/add.svg" alt="add icon" width={30} height={30} />
          Add Remedy
        </StyledLink>
      </LinksContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1.25rem;
  position: relative;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  @media (max-width: 600px) {
    height: 150px;
    width: 150px;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.75rem;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    position: absolute;
    top: 120px;
    right: 29px;
    box-shadow: 1px 1px 10px black;
    z-index: 100;
    width: 60%;
    border-radius: 10px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;

  @media (min-width: 601px) {
    display: none;
  }
`;
