import React from "react";
import styled from "styled-components";

export default function Layout({ children }) {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
}

const Container = styled.main`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;
