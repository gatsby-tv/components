import React, {
  useRef,
  useContext,
  useCallback,
  useReducer,
  useEffect,
} from "react";
import styled from "styled-components";
import { usePopper } from "react-popper-workaround";

import { ViewportContext } from "../Viewport";

import "../../config/styles.css";

const Container = styled.div.attrs((props) => ({
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

const Progress = styled.div.attrs((props) => ({
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

const ProgressBall = styled.div.attrs((props) => ({
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

const BufferProgress = styled.div.attrs((props) => ({
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

const Reference = styled.div.attrs((props) => ({
  className: "gz-player-popper-reference",
}))``;

const Popper = styled.div.attrs((props) => ({
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

const ScrubContainer = styled.div.attrs((props) => ({
  className: "gz-player-popper-container",
  style: {
    right: `${100 - props.percentage}%`,
  },
}))`
  position: absolute;
`;

type TimelineProps = {
  onUpdate: (number) => any;
  time: number;
  progress: number;
};

const Timeline: React.FC<TimelineProps> = (props) => {
  const timeline = useRef(null);
  const reference = useRef(null);
  const popper = useRef(null);
  const [viewport, video, callbacks, setCallbacks] = useContext(
    ViewportContext
  );
  const { styles, attributes } = usePopper(reference.current, popper.current, {
    placement: "top",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 15],
        },
      },
    ],
  });

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "update":
          return {
            ...state,
            position: action.position,
            visible: true,
          };

        case "clear":
          return {
            ...state,
            visible: false,
          };
      }
    },
    { position: 0, visible: false }
  );

  const getTimePercentage = useCallback(
    (time) => {
      if (!video.current) {
        return 0;
      }

      return (100 * time) / video.current.duration;
    },
    [video.current]
  );

  const getScrubTimeString = useCallback(() => {
    if (!video.current || !video.current.duration) {
      return "0:00";
    }

    let time = (state.position * video.current.duration) / 100;

    const timeHours = String(Math.floor(time / 3600));
    time %= 3600;
    const timeMinutes = String(Math.floor(time / 60));
    const timeSeconds = String(Math.floor(time % 60)).padStart(2, "0");

    if (timeHours !== "0") {
      return `${timeHours}:${timeMinutes}:${timeSeconds}`;
    } else {
      return `${timeMinutes}:${timeSeconds}`;
    }
  }, [video.current, state.position]);

  const updatePopper = useCallback(
    (event) => {
      const rect = timeline.current.getBoundingClientRect();
      const percentage =
        100 *
        Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
      setState({ type: "update", position: percentage });
    },
    [timeline.current]
  );

  const seekTo = useCallback(
    (event) => {
      const rect = timeline.current.getBoundingClientRect();
      video.current.currentTime =
        video.current.duration *
        Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
    },
    [video.current, timeline.current]
  );

  const scrubTo = useCallback(
    (event) => {
      if (event.buttons !== 1) {
        return;
      }
      const rect = timeline.current.getBoundingClientRect();
      const time =
        video.current.duration *
        Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
      props.onUpdate(time);
    },
    [video.current, timeline.current]
  );

  const events = {
    onClick: (event) => event.stopPropagation(),
    onMouseDown: scrubTo,
    onMouseMove: (event) => {
      updatePopper(event);
      scrubTo(event);
    },
    onMouseEnter: updatePopper,
    onMouseLeave: () => setState({ type: "clear" }),
    onMouseUp: seekTo,
  };

  return (
    <>
      <Container ref={timeline} {...events}>
        <Progress percentage={getTimePercentage(props.time)}>
          <ProgressBall />
        </Progress>
        <BufferProgress percentage={getTimePercentage(props.progress)} />
      </Container>
      <ScrubContainer percentage={state.position}>
        <Reference ref={reference} />
        <Popper
          ref={popper}
          visible={state.visible}
          style={styles.popper}
          {...attributes.popper}
        >
          {getScrubTimeString()}
        </Popper>
      </ScrubContainer>
    </>
  );
};

export { TimelineProps };
export default Timeline;
