import React, {
  useRef,
  useContext,
  useCallback,
  useReducer,
  useEffect,
} from "react";
import { usePopper } from "react-popper-workaround";

import { ViewportContext } from "../../../Viewport";

import {
  Container,
  Progress,
  ProgressBall,
  BufferProgress,
  Reference,
  Popper,
  ScrubContainer,
} from "./Styles";

interface UpdateAction {
  type: "update";
  position: number;
}

interface ClearAction {
  type: "clear";
}

type TimelineAction = UpdateAction | ClearAction;

interface TimelineState {
  position: number;
  visible: boolean;
}

export interface TimelineProps {
  onUpdate(time: number): void;
  time: number;
  progress: number;
}

export const Timeline: React.FC<TimelineProps> = (props) => {
  const { video } = useContext(ViewportContext);

  const timeline = useRef<HTMLDivElement>(null);
  const reference = useRef(null);
  const popper = useRef(null);

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
    (state: TimelineState, action: TimelineAction) => {
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
      if (!video?.current) {
        return 0;
      }

      return (100 * time) / video.current.duration;
    },
    [video?.current]
  );

  const getScrubTimeString = useCallback(() => {
    if (!video?.current?.duration) {
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
  }, [video?.current, state.position]);

  const updatePopper = useCallback(
    (event) => {
      if (timeline?.current) {
        const rect = timeline.current.getBoundingClientRect();
        const percentage =
          100 *
          Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
        setState({ type: "update", position: percentage });
      }
    },
    [timeline?.current]
  );

  const seekTo = useCallback(
    (event: React.MouseEvent) => {
      if (video?.current && timeline?.current) {
        const rect = timeline.current.getBoundingClientRect();
        video.current.currentTime =
          video.current.duration *
          Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
      }
    },
    [video?.current, timeline?.current]
  );

  const scrubTo = useCallback(
    (event: React.MouseEvent) => {
      if (event.buttons === 1 && video?.current && timeline?.current) {
        const rect = timeline.current.getBoundingClientRect();
        const time =
          video.current.duration *
          Math.min(Math.max(0, (event.clientX - rect.left) / rect.width), 1);
        props.onUpdate(time);
      }
    },
    [video?.current, timeline?.current]
  );

  const events = {
    onClick: (event: React.MouseEvent) => event.stopPropagation(),
    onMouseDown: scrubTo,
    onMouseMove: (event: React.MouseEvent) => {
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
