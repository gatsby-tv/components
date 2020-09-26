import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-player",
  style: props.fullscreen
    ? {
        height: "100vh",
        maxHeight: "none",
      }
    : {
        height: "calc((9 / 16) * 100vw)",
        maxHeight: "calc(100vh - 14rem)",
      },
}))`
  position: relative;
  width: 100%;
  min-height: 48rem;
  z-index: 500;

  background: black;
`;

export const VideoBox = styled.div.attrs((props) => ({
  className: "gz-player-video-wrapper",
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;
