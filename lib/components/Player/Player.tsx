import React, {
  useCallback,
  useState,
  useEffect,
  useReducer,
  useRef,
  CSSProperties,
} from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBackward,
  Expand,
  Compress,
  Spinner,
} from "@gatsby-tv/icons";
import { css } from "styled-components";

import {
  Activatable,
  Box,
  Circle,
  Flex,
  Icon,
  EventListener,
  Viewport,
  Video,
  VideoProps,
} from "@lib/components";
import { IconSource } from "@lib/types";

import { Shading, Signal } from "./components";

interface Dimensions {
  width: number;
  height: number;
}

type PlayerAction =
  | { type: "activate" }
  | { type: "deactivate" }
  | { type: "idle" }
  | { type: "pause" }
  | { type: "waiting" }
  | { type: "playing" }
  | { type: "stalled" }
  | { type: "seeking" }
  | { type: "seeked" }
  | { type: "scrub"; time: number }
  | { type: "timeupdate"; time: number }
  | { type: "progress"; progress: number }
  | { type: "ended" };

interface PlayerState {
  active: boolean;
  idletime: number;
  playing: boolean;
  paused: boolean;
  stalled: boolean;
  seeking: boolean;
  scrubbing: boolean;
  waiting: boolean;
  time: number;
  progress: number;
  ended: boolean;
}

export interface PlayerProps {
  video: VideoProps;
  fullscreen?: boolean;
  toggleFullscreen?: () => void;
}

export function Player(props: PlayerProps) {
  const player = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [signal, setSignal] = useState("");
  const [loading, setLoading] = useState(false);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const [state, dispatch] = useReducer(
    (state: PlayerState, action: PlayerAction) => {
      switch (action.type) {
        case "activate":
          return {
            ...state,
            active: true,
            idletime: state.paused ? -Infinity : 0,
          };

        case "deactivate":
          return {
            ...state,
            active: state.paused,
            idletime: state.paused ? -Infinity : Infinity,
            scrubbing: false,
          };

        case "idle":
          return {
            ...state,
            active: state.idletime < 16,
            idletime: state.idletime + 1,
          };

        case "pause":
          return {
            ...state,
            active: true,
            idletime: -Infinity,
            playing: false,
            paused: true,
          };

        case "waiting":
          return {
            ...state,
            waiting: true,
          };

        case "playing":
          return {
            ...state,
            active: true,
            idletime: 0,
            playing: true,
            paused: false,
            stalled: false,
            waiting: false,
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
            time: action.time,
            scrubbing: true,
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
            ended: true,
            playing: false,
            paused: false,
          };

        default:
          return state;
      }
    },
    {
      active: false,
      idletime: 0,
      time: 0,
      progress: 0,
      playing: false,
      paused: false,
      stalled: false,
      seeking: false,
      scrubbing: false,
      waiting: false,
      ended: false,
    }
  );

  useEffect(() => handleResize(), []);

  useEffect(() => {
    const id = setTimeout(() => setSignal(""), 700);
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
    const id = setInterval(() => dispatch({ type: "idle" }), 250);
    return () => clearInterval(id);
  }, []);

  const findBufferIndex = useCallback((event) => {
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
  }, []);

  const togglePlayback = useCallback(() => {
    if (state.paused) {
      video?.current?.play();
      setSignal("play");
    } else {
      video?.current?.pause();
      setSignal("pause");
    }
  }, [state.paused]);

  const seekTo = useCallback((time) => {
    if (video?.current) {
      video.current.currentTime = time;
      dispatch({ type: "timeupdate", time: time });
    }
  }, []);

  const handleResize = useCallback(() => {
    if (player?.current) {
      const rect = player.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  const handleKeydown = useCallback(
    (event: React.SyntheticEvent) => {
      const { toggleFullscreen = () => undefined } = props;

      switch ((event as any).key) {
        case " ":
          event.preventDefault();
          togglePlayback();
          return;

        case "f":
        case "F":
          toggleFullscreen();
          return;

        case "k":
        case "K":
          togglePlayback();
          return;

        case "ArrowRight":
          if (!video?.current) return;
          if (!state.seeking) setSignal("skipForward");
          seekTo(
            Math.min(video.current.currentTime + 5, video.current.duration)
          );
          return;

        case "ArrowLeft":
          if (!video?.current) return;
          if (!state.seeking) setSignal("skipBackward");
          seekTo(Math.max(video.current.currentTime - 5, 0));
          return;
      }
    },
    [state.paused, state.seeking]
  );

  const videoEvents = {
    onPause: useCallback(() => dispatch({ type: "pause" }), []),
    onPlaying: useCallback(() => dispatch({ type: "playing" }), []),
    onStalled: useCallback(() => dispatch({ type: "stalled" }), []),
    onSeeking: useCallback(() => dispatch({ type: "seeking" }), []),
    onWaiting: useCallback(() => dispatch({ type: "waiting" }), []),
    onEnded: useCallback(() => dispatch({ type: "ended" }), []),
    onTimeUpdate: useCallback((event: React.SyntheticEvent) => {
      const target = event.target as HTMLMediaElement;
      dispatch({ type: "timeupdate", time: target.currentTime });
    }, []),
    onProgress: useCallback((event: React.SyntheticEvent) => {
      const target = event.target as HTMLMediaElement;
      const bufferIndex = findBufferIndex(event);
      const progress = target.buffered.end(bufferIndex || 0);
      dispatch({ type: "progress", progress: progress });
    }, []),
    onSeeked: useCallback((event: React.SyntheticEvent) => {
      const target = event.target as HTMLMediaElement;
      const bufferIndex = findBufferIndex(event);
      const progress = target.buffered.end(bufferIndex || 0);
      dispatch({ type: "seeked" });
      dispatch({ type: "progress", progress: progress });
    }, []),
  };

  const playerEvents = {
    onClick: togglePlayback,
    onMouseDown: useCallback(() => dispatch({ type: "activate" }), []),
    onMouseMove: useCallback(() => dispatch({ type: "activate" }), []),
    onMouseLeave: useCallback(() => dispatch({ type: "deactivate" }), []),
  };

  const iconMarkup = () => {
    switch (signal) {
      case "play":
        return (
          <Icon paddingLeft="0.28rem" paddingTop="0.24rem" source={Play} />
        );

      case "pause":
        return <Icon padding="0.4rem" source={Pause} />;

      case "skipBackward":
        return <Icon source={SkipBackward} />;

      case "skipForward":
        return <Icon source={SkipForward} />;

      default:
        return null;
    }
  };

  const signalMarkup = signal ? (
    <Box absolute $fill>
      <Flex $fill center>
        <Signal size="5.2rem" padding="3.2rem" bg="black" fg="white">
          {iconMarkup()}
        </Signal>
      </Flex>
    </Box>
  ) : null;

  const loadingMarkup = loading ? (
    <Box absolute $fill>
      <Flex $fill center>
        <Circle size="11.6rem">
          <Icon source={Spinner} />
        </Circle>
      </Flex>
    </Box>
  ) : null;

  const overlayMarkup = (
    <Activatable
      $fill
      style={{ cursor: state.active ? "default" : "none" }}
      active={state.active}
    >
      <Box absolute $fill>
        <Shading $fill />
        {signalMarkup}
        {loadingMarkup}
      </Box>
    </Activatable>
  );

  return (
    <Viewport
      ref={player}
      $height={props.fullscreen ? "100vh" : "calc((9 / 16) * 100vw)"}
      maxHeight={props.fullscreen ? "none" : "calc(100vh - 14rem)"}
      minHeight="48rem"
      overlay={overlayMarkup}
      aspectRatio={dimensions.height / dimensions.width}
      {...playerEvents}
    >
      <Flex center $height={1}>
        <Video ref={video} {...videoEvents} {...props.video} />
      </Flex>
      <EventListener event="resize" handler={handleResize} />
      <EventListener event="keydown" handler={handleKeydown} />
    </Viewport>
  );
}
