import styled from "styled-components";

export const Container = styled.button.attrs((props) => ({
  className: "gz-panel-close",
}))`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 600;
  padding: 0;
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
  background-color: var(--dark-grey-5);
  color: white;
  outline: none;
  border: none;
  border-radius: 100%;
  opacity: 0.8;
  cursor: pointer;

  backface-visibility: hidden;

  transition: all 100ms ease;

  &:hover {
    opacity: 1;
  }
`;
