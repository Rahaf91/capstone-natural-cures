import styled, { css } from "styled-components";
import Link from "next/link";

export const StyledLinks = styled(Link)`
  border: none;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  margin-top: 0.625rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  width: 220px;
  color: white;
  font-family: var(--font-capriola);

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  background-color: ${(props) =>
    props.$variant === "edit"
      ? "#54582f"
      : props.$variant === "view"
      ? "#854628"
      : "#86895d"};

  ${(props) =>
    props.$variant === "back" &&
    css`
      background-color: transparent;
      color: black;
      padding: 0;
      font-size: 1rem;
      text-align: right;
      width: auto;
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
    props.$variant === "bookmarked" &&
    css`
      background-color: #ec8c02;
      padding: 1rem, 1.5rem;
      font-weight: bold;
      border-radius: var(--border-radius);
      width: 80%;
      margin: 1.25rem auto;
      position: fixed;
      bottom: 1.25rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 1000;

      &:hover {
        background-color: #2d4373;
      }
    `}
`;
