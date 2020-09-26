import styled from "styled-componenets";

export const Container = styled.div.attrs((props) => ({
  className: "gz-player-overlay",
}))`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 300;
`;

export const OverlayContainer = styled.div.attrs((props) => ({
  className: "gz-player-overlay-container",
  style: props.active
    ? {
        opacity: 1,
        cursor: "default",
      }
    : {
        opacity: 0,
        cursor: "none",
      },
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  transition: opacity 200ms ease;
`;

export const Shading = styled.div.attrs((props) => ({
  className: "gz-player-overlay-shading",
}))`
  width: 100%;
  height: 100%;

  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6),
    transparent 20%,
    transparent 80%,
    rgba(0, 0, 0, 0.6)
  );
`;

export const TimelineContainer = styled.div.attrs((props) => ({
  className: "gz-player-overlay-timeline-wrapper",
}))`
  position: absolute;
  left: 2rem;
  bottom: 4.5rem;
  right: 2rem;
  z-index: 305;
`;

export const Controls = styled.div.attrs((props) => ({
  className: "gz-player-overlay-controls",
}))`
  display: flex;
  align-items: stretch;

  position: absolute;
  right: 2rem;
  bottom: 0;
  left: 2rem;
  height: 4.6rem;

  font-size: 2rem;
`;

export const PlaybackControls = styled.div.attrs((props) => ({
  className: "gz-player-overlay-controls-playback",
}))`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
`;

export const ViewportControls = styled.div.attrs((props) => ({
  className: "gz-player-overlay-controls-viewport",
}))`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: stretch;

  width: 100%;
`;

export const ControlButton = styled.button.attrs((props) => ({
  className: "gz-player-overlay-control-button",
}))`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 1rem;
  height: 100%;

  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  fill: white;
  opacity: 0.9;

  svg {
    width: 2rem !important;
    height: 2rem !important;
  }
`;

export const TimeStamp = styled.p.attrs((props) => ({
  className: "gz-player-overlay-timestamp",
}))`
  margin: 0;
  padding: 0 1rem;

  font-size: 1.5rem;
  font-condensed: condensed;
  user-select: none;
`;

export const Loading = styled.div.attrs((props) => ({
  className: "gz-player-overlay-loading",
}))`
  position: absolute;
  top: calc(50% - 7.5rem);
  left: calc(50% - 7.5rem);
  width: 12rem;
  height: 12rem;

  border: 1.5rem solid transparent;
  border-top: 1.5rem solid white;
  border-radius: 100%;
  opacity: 0.6;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }

  animation-name: spin;
  animation-duration: 1500ms;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;
