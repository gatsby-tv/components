import styled from "styled-components";

export const Wrapper = styled.div.attrs((props) => ({
  className: "gz-panel-wrapper",
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Container = styled.div.attrs((props) => ({
  className: "gz-panel",
}))`
  position: relative;

  overflow: hidden;
  background-color: var(--dark-grey-3);
  border-radius: 0.5rem;
  z-index: 1000;

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(10%);
    }

    80% {
      opacity: 1;
    }

    100% {
      transform: translateY(0);
    }
  }

  animation-name: slide;
  animation-timing-function: ease;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
`;
