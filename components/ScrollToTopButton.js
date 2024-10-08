import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTop() {
  const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 0.5rem;
    border-radius: var(--border-radius);
    border: none;
    background-color: #54582f;
    color: white;
    box-shadow: var(--box-shadow);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    z-index: 1000;
  `;

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div>
      <ScrollToTopButton onClick={scrollToTop} aria-label="Scroll to top">
        <FontAwesomeIcon icon={faArrowUp} />
      </ScrollToTopButton>
    </div>
  );
}
