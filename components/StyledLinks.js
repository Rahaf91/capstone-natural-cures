import styled from "styled-components";
import Link from "next/link";
export const StyledLink = styled(Link)`
  background-color: #86895d;
  color: #f8fbca;
  padding: 12px 24px;
  text-decoration: none;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  width: 100%;
  &:hover {
    background-color: #54582f;
  }
`;
export const StyledLinkBookmarked = styled(StyledLink)`
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
  &:hover {
    background-color: #2d4373;
  }
`;
