import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <HeaderWrapper className="no-print">
      <LogoContainer>
        <Link href={"/"}>
          <StyledImage src="/Logo.png" alt="Logo" height={200} width={200} />
        </Link>
      </LogoContainer>

      <MenuToggle onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <Image
          src={isMenuOpen ? "/close-menu.svg" : "/open-menu.svg"}
          alt={isMenuOpen ? "Close Menu" : "Open Menu"}
          width={60}
          height={60}
        />
      </MenuToggle>

      <LinksContainer
        $isOpen={isMenuOpen}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <StyledLink href="/favorites">
          <Image src="/heart.svg" alt="heart icon" width={50} height={50} />
          Favorite Remedies
        </StyledLink>

        <StyledLink
          href="/remedy/add"
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <Image src="/add.svg" alt="add icon" width={50} height={50} />
          Add Remedy
        </StyledLink>
        <UserMenu />
      </LinksContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  position: sticky;
  top: 7px;
  display: flex;
  z-index: 2000;
  background-color: var(--header-bg-color);
  align-items: center;
  justify-content: space-around;
  box-shadow: var(--header-card-box-shadow);
  height: 13vh;
  margin-top: 1rem;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
    margin: 0;
    padding: 0 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledImage = styled(Image)`
  height: auto;
  width: auto;
  max-width: 15rem;

  @media (max-width: 600px) {
    max-width: 10rem;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
    position: absolute;
    top: 90px;
    right: 20px;
    border: 4px solid var(--border-color);
    background-color: var(--header-bg-color);
    z-index: 11;
    width: 90%;
    opacity: 90%;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--header-text-color);
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(1.2);
  }
  @media (max-width: 600px) {
    width: 100%;
    justify-content: flex-start;
    font-size: 1rem;
    transition: none;

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  margin-right: 1rem;

  @media (min-width: 601px) {
    display: none;
  }
`;
