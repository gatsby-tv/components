import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-player-timeline",
}))`
  height: 0.4rem;
  z-index: 0;

  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);

  transition: transform 150ms ease;

  &:hover {
    transform: scaleY(1.5);

    .gz-player-progress-ball {
      transform: scale(1, 0.66);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: -1rem;
    right: 0;
    left: 0;
    height: 2rem;
  }
`;

export const Progress = styled.div.attrs((props) => ({
  className: "gz-player-progress",
  style: {
    right: `${100 - props.percentage}%`,
  },
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 2;

  background-color: var(--gatsby-gold);
`;

export const ProgressBall = styled.div.attrs((props) => ({
  className: "gz-player-progress-ball",
}))`
  position: absolute;
  top: -137%;
  right: -0.7rem;
  width: 1.4rem;
  height: 1.4rem;
  z-index: 3;

  background-color: var(--gatsby-gold);
  border-radius: 100%;

  transition: transform 150ms ease;
  transform: scale(0);
`;

export const BufferProgress = styled.div.attrs((props) => ({
  className: "gz-player-buffer-progress",
  style: {
    right: `${100 - props.percentage}%`,
  },
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;

  background-color: rgba(255, 255, 255, 0.2);
`;

export const Reference = styled.div.attrs((props) => ({
  className: "gz-player-popper-reference",
}))``;

export const Popper = styled.div.attrs((props) => ({
  className: "gz-player-popper",
  style: {
    opacity: props.visible ? "1" : "0",
  },
}))`
  font-size: 1.65rem;
  font-weight: 600;
  font-condensed: condensed;
  user-select: none;

  transition: opacity 200ms ease;
`;

export const ScrubContainer = styled.div.attrs((props) => ({
  className: "gz-player-popper-container",
  style: {
    right: `${100 - props.percentage}%`,
  },
}))`
  position: absolute;
`;
