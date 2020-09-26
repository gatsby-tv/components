import React, {
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  useReducer,
} from "react";
import {
  faPlay,
  faPause,
  faUndoAlt,
  faRedoAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Play, Pause, Expand, Compress } from "../../../Icons";
import { ViewportContext } from "../../../Viewport";

import { Timeline } from "../Timeline";
import { Signal } from "../Signal"

import {
  Container,
  OverlayContainer,
  Shading,
  TimelineContainer,
  Controls,
  PlaybackControls,
  ViewportControls,
  ControlButton,
  TimeStamp,
  Loading,
} from "./Styles"

export interface OverlayProps {}

export const Overlay: React.FC<OverlayProps> = (props) => {
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
          };

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
      setSignal(<Signal icon={faPlay} />);
    } else {
      video.current.pause();
      setSignal(<Signal icon={faPause} />);
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

  const seekTo = useCallback(
    (time) => {
      video.current.currentTime = time;
      setState({ type: "timeupdate", time: time });
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
          seekTo(
            Math.min(video.current.currentTime + 5, video.current.duration)
          );
          if (!state.seeking) {
            setSignal(<Signal icon={faRedo} />);
          }
          return;

        case "ArrowLeft":
          seekTo(Math.max(video.current.currentTime - 5, 0));
          if (!state.seeking) {
            setSignal(<Signal icon={faUndo} />);
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
  }, []);

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
