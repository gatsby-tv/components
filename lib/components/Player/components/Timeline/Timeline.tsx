import React, {
  useRef,
  useContext,
  useCallback,
  useReducer,
  useEffect,
  forwardRef,
} from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";

import { Box } from "@lib/components/Box";
import { Activatable } from "@lib/components/Activatable";
import { cssTextTimeline } from "@lib/styles/typography";
import { useTheme } from "@lib/utilities/use-theme";
import { format } from "@lib/utilities/time";

const TimelineBase = styled(Box)`
  cursor: pointer;
  transition: transform 150ms ease;

  &:hover {
    transform: scaleY(1.5);

    [data-progress-ball] {
      transform: scale(1, 0.66);
    }
  }

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    right: 0;
    left: 0;
    height: 20px;
  }
`;

export interface TimelineProps {
  time: number;
  progress: number;
  position: number;
  duration: number;
  active?: boolean;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (props, ref) => {
    const theme = useTheme();
    const reference = useRef(null);
    const popper = useRef(null);

    const { styles, attributes } = usePopper(
      reference.current,
      popper.current,
      {
        placement: "top",
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 15],
            },
          },
        ],
      }
    );

    const progressBallMarkup = (
      <Box
        absolute
        css={`
          border-radius: 100%;
          transition: transform 150ms ease;
          transform: scale(0);
        `}
        $top={-1.37}
        $right="-7px"
        $width="14px"
        $height="14px"
        bg={theme.colors.gold}
        data-progress-ball
      />
    );

    const progressMarkup = (
      <>
        <Box
          style={{ right: `${100 * (1 - props.progress)}%` }}
          absolute
          $fill
          bg={theme.colors.placeholder.opaquer(0.1)}
        />
        <Box
          style={{ right: `${100 * (1 - props.time)}%` }}
          absolute
          $fill
          bg={theme.colors.gold}
        >
          {progressBallMarkup}
        </Box>
      </>
    );

    return (
      <>
        <TimelineBase ref={ref} $height="4px" bg={theme.colors.placeholder}>
          {progressMarkup}
        </TimelineBase>
        <Box style={{ right: `${100 * (1 - props.position)}%` }} absolute>
          <Box ref={reference} />
          <Activatable
            ref={popper}
            css={cssTextTimeline}
            active={props.active}
            duration={150}
          >
            {format(props.position * props.duration)}
          </Activatable>
        </Box>
      </>
    );
  }
);
