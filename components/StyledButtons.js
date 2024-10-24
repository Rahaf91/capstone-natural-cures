import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  font-family: var(--font-capriola);
  border: none;
  padding: ${(props) =>
    props.size === "small" ? "0.3rem 0.1rem" : "0.5rem 1.2rem"};
  border-radius: var(--border-radius);
  margin-top: 0.625rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 220px;
  color: white;
  font-size: 1rem;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #54582f;
      color: white;
      padding: 0.5rem 1.2rem;

      &:hover {
        background-color: #86895d;
      }
    `}

  ${(props) =>
    props.variant === "cancel" &&
    css`
      background-color: #bdc3c7;

      &:hover {
        background-color: #95a5a6;
      }
    `}

    ${(props) =>
    props.variant === "remove" &&
    css`
      background-color: #bdc3c7;
      color: #2c3e50;
      height: var(--height);
      display: flex;
      align-items: center;
      font-size: 1rem;
      margin: 0;
      border-radius: var(--border-radius);
      width: 10rem;
      &:hover {
        background-color: #dcdcdc;
        color: #2c3e50;
      }

      &:active {
        background-color: #c0c0c0;
      }
      @media (max-width: 600px) {
        width: 60%;
      }
    `}

  ${(props) =>
    props.variant === "delete" &&
    css`
      background-color: #e74c3c;
      color: white;

      &:hover {
        background-color: #c0392b;
      }
    `}

  ${(props) =>
    props.variant === "edit" &&
    css`
      background-color: #a67b5b;
      color: white;
      width: 10%;
      &:hover {
        background-color: #ec8c02;
      }
      @media (max-width: 600px) {
        width: 50%;
      }
    `}
`;

export const StyledFavoriteButton = styled.button`
  border: none;
  background-color: #54582f;
  padding: 0.625rem;
  min-width: 2.5rem;
  height: 2.5rem;
  display: flex;
  border-radius: 1.25rem;
  margin: 0.3rem;

  &:hover {
    background-color: #86895d;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  margin-bottom: 1rem;

  ${(props) =>
    props.$fullWidth &&
    `
      width: 50%;
  margin:0 auto;
      background:#86895d;
    `}
  &:hover {
    transform: scale(1.2);
  }
`;
