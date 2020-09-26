import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-modal",
}))`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  background-color: var(--overlay-contrast);

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation-name: fadein;
  animation-timing-function: ease;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
`;
