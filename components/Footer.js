// Footer.js
import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer className="no-print">
      <p>
        <strong>Made With Love ❤️</strong>
      </p>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  max-width: 60rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  color: #54582f;
  @media (max-width: 600px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;
