import { css } from "styled-components";

export const BaseStyle = css`
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-block;
  text-align: center;
  text-decoration: none;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;
