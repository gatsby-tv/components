import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faUndoAlt,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

import Timeline from "./Timeline";
import { Play, Pause, Expand, Compress } from "../Icons";
import { ViewportContext } from "../Viewport";

import "../../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-player-overlay",
}))`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 300;
`;

const OverlayContainer = styled.div.attrs((props) => ({
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

const TimelineContainer = styled.div.attrs((props) => ({
  className: "gz-player-overlay-timeline-wrapper",
}))`
  position: absolute;
  left: 2rem;
  bottom: 4.5rem;
  right: 2rem;
  z-index: 305;
`

const Controls = styled.div.attrs((props) => ({
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

const PlaybackControls = styled.div.attrs((props) => ({
  className: "gz-player-overlay-controls-playback",
}))`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: flex-start;
  align-items: center;

  width: 100%;
`;

const ViewportControls = styled.div.attrs((props) => ({
  className: "gz-player-overlay-controls-viewport",
}))`
  display: flex;
  flex-shrink: 1;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: stretch;

  width: 100%;
`;

const ControlButton = styled.button.attrs((props) => ({
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

const TimeStamp = styled.p.attrs((props) => ({
  className: "gz-player-overlay-timestamp",
}))`
  margin: 0;
  padding: 0 1rem;

  font-size: 1.5rem;
  font-condensed: condensed;
  user-select: none;
`;

const Loading = styled.div.attrs((props) => ({
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

const Signal = styled.div.attrs((props) => ({
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

const PlaySignal = () => (
  <Signal>
    <FontAwesomeIcon style={{ paddingLeft: "1rem" }} icon={faPlay} />
  </Signal>
);

const PauseSignal = () => (
  <Signal>
    <FontAwesomeIcon icon={faPause} />
  </Signal>
);

const RewindSignal = () => (
  <Signal>
    <FontAwesomeIcon icon={faUndoAlt} />
  </Signal>
);

const SkipSignal = () => (
  <Signal>
    <FontAwesomeIcon icon={faRedoAlt} />
  </Signal>
);

type OverlayProps = {};

const Overlay: React.FC<OverlayProps> = (props) => {
  const [viewport, video, callbacks, setCallbacks] = useContext(
    ViewportContext
  );
  const [loading, setLoading] = useState(false);
  const [signal, setSignal] = useState(null);

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "deactivate":
          return {
            ...state,
            active: state.paused,
            scrubbing: false,
            idletime: state.paused ? -Infinity : Infinity,
          };

        case "idle":
          return {
            ...state,
            idletime: state.idletime + 1,
            active: state.idletime < 16,
          }

        case "activate":
          return {
            ...state,
            active: true,
            idletime: state.paused ? -Infinity : 0,
          };

        case "pause":
          return {
            ...state,
            playing: false,
            paused: true,
            active: true,
            idletime: -Infinity,
          };

        case "waiting":
          return {
            ...state,
            waiting: true,
          };

        case "playing":
          return {
            ...state,
            playing: true,
            paused: false,
            stalled: false,
            waiting: false,
            active: true,
            idletime: 0,
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
            scrubbing: false,
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
      idletime: 0,
      playing: false,
      paused: false,
      stalled: false,
      seeking: false,
      scrubbing: false,
      waiting: false,
      time: 0,
      progress: 0,
      ended: false,
    }
  );

  const findBufferIndex = (event) => {
    let bufferIndex;
    let delta = Infinity;
    for (let i = 0; i < event.target.buffered.length; i++) {
      const x = event.target.buffered.end(i) - event.target.currentTime;
      if (x > 0 && x < delta) {
        bufferIndex = i;
        delta = x;
      }
    }

    return bufferIndex;
  };

  const togglePlayback = useCallback(() => {
    if (state.paused) {
      video.current.play();
      setSignal(<PlaySignal />);
    } else {
      video.current.pause();
      setSignal(<PauseSignal />);
    }
  }, [video.current, state.paused]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      viewport.current.requestFullscreen();
    }
  }, [viewport.current]);

  const getTimeString = useCallback(() => {
    if (!video.current || !video.current.duration) {
      return "0:00 / 0:00";
    }

    let time = video.current.currentTime;
    let duration = video.current.duration;

    const durationHours = String(Math.floor(duration / 3600));
    duration %= 3600;
    const durationMinutes = String(Math.floor(duration / 60));
    const durationSeconds = String(Math.floor(duration % 60)).padStart(2, "0");

    const timeHours = String(Math.floor(time / 3600)).padStart(
      durationHours.length,
      "0"
    );
    time %= 3600;
    const timeMinutes = String(Math.floor(time / 60)).padStart(
      durationMinutes.length,
      "0"
    );
    const timeSeconds = String(Math.floor(time % 60)).padStart(2, "0");

    if (durationHours !== "0") {
      return `${timeHours}:${timeMinutes}:${timeSeconds} / ${durationHours}:${durationMinutes}:${durationSeconds}`;
    } else {
      return `${timeMinutes}:${timeSeconds} / ${durationMinutes}:${durationSeconds}`;
    }
  }, [video.current]);

  const seekTo = useCallback((time) => {
      video.current.currentTime = time;
      setState({ type: "timeupdate", time: time })
    },
    [video.current]
  );

  useEffect(() => {
    const callbacks = [
      "pause",
      "playing",
      "stalled",
      "seeking",
      "seeked",
      "waiting",
      "timeupdate",
      "progress",
      "ended",
    ].map((type, index) => {
      switch (type) {
        case "timeupdate":
          return {
            type: type,
            callback: (event) => {
              const time = event.target.currentTime;
              setState({ type: type, time: time });
            },
          };

        case "progress":
          return {
            type: type,
            callback: (event) => {
              const bufferIndex = findBufferIndex(event);
              const progress = event.target.buffered.end(bufferIndex);
              setState({ type: type, progress: progress });
            },
          };

        case "seeked":
          return {
            type: type,
            callback: (event) => {
              const bufferIndex = findBufferIndex(event);
              const progress = event.target.buffered.end(bufferIndex);
              setState({ type: "progress", progress: progress });
              setState({ type: type });
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
    const handleKeydown = (event) => {
      switch (event.code) {
        case "Space":
          event.preventDefault();
          togglePlayback();
          return;

        case "KeyF":
          toggleFullscreen();
          return;

        case "KeyK":
          togglePlayback();
          return;

        case "ArrowRight":
          seekTo(Math.min(
            video.current.currentTime + 5,
            video.current.duration
          ));
          if (!state.seeking) {
            setSignal(<SkipSignal />);
          }
          return;

        case "ArrowLeft":
          seekTo(Math.max(
            video.current.currentTime - 5,
            0
          ));
          if (!state.seeking) {
            setSignal(<RewindSignal />);
          }
          return;

        default:
          return;
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [viewport.current, video.current, state.paused, state.seeking]);

  useEffect(() => {
    const id = setTimeout(() => setSignal(null), 700);
    return () => clearTimeout(id);
  }, [signal]);

  useEffect(() => {
    if (state.waiting) {
      const id = setTimeout(() => setLoading(true), 200);
      return () => clearTimeout(id);
    } else {
      setLoading(false);
    }
  }, [state.waiting]);

  useEffect(() => {
    const id = setInterval(() => setState({ type: "idle" }), 250);
    return () => clearInterval(id);
  }, [])

  const events = {
    onClick: togglePlayback,
    onMouseDown: () => setState({ type: "activate" }),
    onMouseMove: () => setState({ type: "activate" }),
    onMouseLeave: () => setState({ type: "deactivate" }),
  };

    return (
      <Container {...events}>
        {loading && <Loading />}
        <OverlayContainer active={state.active}>
          <Shading />
          {signal}
          <TimelineContainer>
            <Timeline
              time={state.time}
              progress={state.progress}
              onUpdate={(time) => setState({ type: "scrub", time: time })}
            />
          </TimelineContainer>
          <Controls onClick={(event) => event.stopPropagation()}>
            <PlaybackControls>
              <ControlButton onClick={togglePlayback}>
                {state.paused ? <Play /> : <Pause />}
              </ControlButton>
              <TimeStamp>{getTimeString()}</TimeStamp>
            </PlaybackControls>
            <ViewportControls>
              <ControlButton onClick={toggleFullscreen}>
                {document.fullscreenElement ? <Compress /> : <Expand />}
              </ControlButton>
            </ViewportControls>
          </Controls>
        </OverlayContainer>
      </Container>
    );
};

export { OverlayProps };
export default Overlay;
