import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";
import styled from "styled-components";

import { ViewportContext } from "../Viewport";

import "../../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-player-overlay",
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
  z-index: 100;

  transition: opacity 200ms ease;
`;

const Shading = styled.div.attrs((props) => ({
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

const Controls = styled.div.attrs((props) => ({
  className: "gz-player-overlay-controls",
}))`
  position: absolute;
  right: 2rem;
  bottom: 1rem;
  left: 2rem;

  height: 4rem;
`;

const Timeline = styled.div.attrs((props) => ({
  className: "gz-player-overlay-timeline",
}))`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 0.25rem;
  z-index: 200;

  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);

  transition: height 150ms ease;

  &:hover {
    height: 0.5rem;

    .gz-player-overlay-progress-ball {
      transform: scale(1.25);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1.25rem;
  }
`;

const Progress = styled.div.attrs((props) => ({
  className: "gz-player-overlay-progress",
  style: {
    right: `${100 - props.percentage}%`,
  },
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 202;

  background-color: var(--gatsby-gold);
`;

const ProgressBall = styled.div.attrs((props) => ({
  className: "gz-player-overlay-progress-ball",
}))`
  display: flex;

  position: absolute;
  top: -50%;
  right: -0.5rem;
  width: 1rem;
  height: 1rem;

  background-color: var(--gatsby-gold);
  border-radius: 100%;

  transition: transform 150ms ease;
  transform: scale(0);
`;

const BufferProgress = styled.div.attrs((props) => ({
  className: "gz-player-overlay-buffer-progress",
  style: {
    right: `${100 - props.percentage}%`,
  },
}))`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 201;

  background-color: rgba(255, 255, 255, 0.2);
`;

type OverlayProps = {};

const Overlay: React.FC<OverlayProps> = (props) => {
  const timeline = useRef(null);
  const [video, _, setCallbacks] = useContext(ViewportContext);

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "deactivate":
          return {
            ...state,
            active: false,
            scrubbing: false,
            timeout: null,
          };

        case "activate":
          const timeout = state.paused
            ? null
            : setTimeout(() => setState({ type: "deactivate" }), 5000);
          return {
            ...state,
            active: true,
            timeout: timeout,
          };

        case "pause":
          return {
            ...state,
            playing: false,
            paused: true,
            active: true,
            timeout: null,
          };

        case "playing":
          return {
            ...state,
            playing: true,
            paused: false,
            stalled: false,
            active: true,
            timeout: setTimeout(() => setState({ type: "deactivate" }), 5000),
          };

        case "stalled":
          return {
            ...state,
            playing: false,
            stalled: true,
          };

        case "seeking":
          return {
            ...state,
            seeking: true,
          };

        case "seeked":
          return {
            ...state,
            seeking: false,
          };

        case "scrub":
          return {
            ...state,
            scrubbing: true,
            time: action.time,
          };

        case "timeupdate":
          return {
            ...state,
            time: state.scrubbing ? state.time : action.time,
          };

        case "progress":
          return {
            ...state,
            progress: action.progress,
          };

        case "ended":
          return {
            ...state,
            playing: false,
            paused: false,
            ended: true,
          };

        default:
          return state;
      }
    },
    {
      active: false,
      timeout: null,
      playing: false,
      paused: false,
      stalled: false,
      seeking: false,
      scrubbing: false,
      time: 0,
      progress: 0,
      ended: false,
    }
  );

  useEffect(() => {
    const callbacks = [
      "pause",
      "playing",
      "stalled",
      "seeking",
      "seeked",
      "timeupdate",
      "progress",
      "ended",
    ].map((type, index) => {
      switch (type) {
        case "timeupdate":
          return {
            type: type,
            callback: (event) => {
              const time =
                (100 * event.target.currentTime) / event.target.duration;
              setState({ type: type, time: time });
            },
          };

        case "progress":
          return {
            type: type,
            callback: (event) => {
              let bufferIndex;
              let delta = Infinity;
              for (let i = 0; i < event.target.buffered.length; i++) {
                const x =
                  event.target.buffered.end(i) - event.target.currentTime;
                if (x > 0 && x < delta) {
                  bufferIndex = i;
                  delta = x;
                }
              }

              const progress =
                (100 * event.target.buffered.end(bufferIndex)) /
                event.target.duration;
              setState({ type: type, progress: progress });
            },
          };

        default:
          return {
            type: type,
            callback: (event) => setState({ type: type }),
          };
      }
    });

    setCallbacks(callbacks);
  }, [video.current]);

  useEffect(() => {
    return () => clearTimeout(state.timeout);
  }, [state.timeout]);

  useEffect(() => {
    const handleKeydown = (event) => {
      switch (event.code) {
        case "KeyK":
          return state.paused ? video.current.play() : video.current.pause()

        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [video.current, state.paused]);

  const timelineSeekTo = useCallback(
    (event) => {
      const rect = timeline.current.getBoundingClientRect();
      video.current.currentTime =
        video.current.duration *
        Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
    },
    [video.current, timeline.current]
  );

  const timelineScrubTo = useCallback(
    (event) => {
      if (event.buttons !== 1) {
        return;
      }
      const rect = timeline.current.getBoundingClientRect();
      const time =
        100 *
        Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
      setState({ type: "scrub", time: time });
    },
    [video.current, timeline.current]
  );

  const controlEvents = {
    onClick: () =>
      state.paused ? video.current.play() : video.current.pause(),
    onMouseDown: () => setState({ type: "activate" }),
    onMouseMove: () => setState({ type: "activate" }),
    onMouseLeave: () => !state.paused && setState({ type: "deactivate" }),
  };

  const timelineEvents = {
    onClick: (event) => event.stopPropagation(),
    onMouseDown: timelineScrubTo,
    onMouseMove: timelineScrubTo,
    onMouseUp: timelineSeekTo,
  };

  return (
    <Container active={state.active} {...controlEvents}>
      <Shading />
      <Controls>
        <Timeline ref={timeline} {...timelineEvents}>
          <Progress percentage={state.time}>
            <ProgressBall />
          </Progress>
          <BufferProgress percentage={state.progress} />
        </Timeline>
      </Controls>
    </Container>
  );
};

export { OverlayProps };
export default Overlay;
