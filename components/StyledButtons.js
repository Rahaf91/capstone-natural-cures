import styled, { css } from "styled-components";
import { BaseStyle } from "@/styles";

export const StyledButton = styled.button`
  ${BaseStyle}

  background-color: ${(props) =>
    props.$variant === "delete" ? "#e74c3c" : "#54582f"};
  color: ${(props) => (props.$variant === "delete" ? "white" : "#f8fbca")};

  &:hover {
    background-color: ${(props) =>
      props.$variant === "delete" ? "#c0392b" : "#86895d"};
  }

  ${(props) =>
    props.$variant === "cancel" &&
    css`
      background-color: #bdc3c7;
      color: #2c3e50;

      &:hover {
        background-color: #95a5a6;
      }
    `}
`;

export const StyledFavoriteButton = styled.button`
  border: none;
  background-color: #54582f;
  padding: 10px;
  min-width: 40px;
  height: 40px;
  display: flex;
  border-radius: 20px;

  &:hover {
    background-color: #86895d;
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const IconButton = styled.button`
  background: #85895e;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  margin-bottom: 1rem;
  ${(props) =>
    props.$fullWidth &&
    `
      width: 100%;
    `}
`;
