import styled from "styled-components"

export const Arrow = styled.button.attrs((props) => ({
  className: "gz-carousel-arrow",
}))`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  height: 5rem;
  z-index: 500;

  cursor: pointer;
  color: var(--font-color);
  background: none;
  border: none;
  border-radius: 10%;
  outline: none;

  transition: all 250ms ease;

  &:hover {
    color: white;
    background-color: var(--placeholder-color);
  }
`;
