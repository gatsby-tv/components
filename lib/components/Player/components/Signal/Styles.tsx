import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-player-overlay-signal",
}))`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: calc(50% - 6rem);
  left: calc(50% - 6rem);
  width: 12rem;
  height: 12rem;

  background-color: black;
  border-radius: 100%;
  font-size: 5rem;
  opacity: 0.6;

  @keyframes appear {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }

    60% {
      opacity: 0.6;
      transform: scale(1.2);
    }

    100% {
      opacity: 0;
      transform: scale(0.8);
    }
  }

  animation-name: appear;
  animation-duration: 710ms;
  animation-fill-direction: forwards;
`;
