// Footer.js
import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <FooterContainer>
      <Text>
        <FontAwesomeIcon icon={faCopyright} /> Copy Right
        <strong>Natural Cures</strong>
      </Text>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  margin-top: 10px;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #dee2e6;
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  color: #343a40;
`;
