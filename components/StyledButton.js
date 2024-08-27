import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;

  ${(props) =>
    props.$variant === "primary" &&
    css`
      background-color: #034f84;
      color: white;
    `}

  ${(props) =>
    props.$variant === "danger" &&
    css`
      background-color: #c94c4c;
      color: white;
    `}

    ${(props) =>
    props.$variant === "secondary" &&
    css`
      background-color: #878f99;
      color: white;
    `}

    ${(props) =>
    props.$variant === "success" &&
    css`
      background-color: #405d27;
      color: white;
    `}
    &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
