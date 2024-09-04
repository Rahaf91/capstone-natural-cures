import styled, { css } from "styled-components";
import Link from "next/link";
import { BaseStyle } from "./BaseStyle";

export const StyledLinks = styled(Link)`
  ${BaseStyle}

  background-color: ${(props) =>
    props.$variant === "edit" ? "#54582f" : "#86895d"};
  color: ${(props) => (props.$variant === "edit" ? "#f8fbca" : "white")};

  ${(props) =>
    props.$variant === "back" &&
    css`
      background-color: transparent;
      color: #6c757d;
      padding: 0;
      margin-top: 20px;
      font-size: 0.9rem;

      &:hover {
        color: #343a40;
      }
    `}

  ${(props) =>
    props.$variant === "bookmarked" &&
    css`
      background-color: #ffa500;
      color: white;
      padding: 14px 28px;
      font-weight: bold;
      border-radius: 12px;
      width: 80%;
      margin: 20px auto;
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 1000;

      &:hover {
        background-color: #2d4373;
      }

      &:active {
        transform: scale(0.95);
      }
    `}
`;
