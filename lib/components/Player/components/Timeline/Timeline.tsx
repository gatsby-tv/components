import React, { useState, useEffect, forwardRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { useTheme, Time } from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Activatable } from "@lib/components/Activatable";
import { cssTextTimeline } from "@lib/styles/typography";

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
  $time: number;
  $progress: number;
  $position: number;
  $duration: number;
  $active?: boolean;
  onClick?: EventHandler;
  onMouseDown?: EventHandler;
  onMouseUp?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  (props, ref) => {
    const theme = useTheme();
    const [reference, setReference] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);

    const {
      $time,
      $progress,
      $position,
      $duration,
      $active,
      ...events
    } = props;

    const { styles, attributes } = usePopper(reference, popper, {
      placement: "top",
      strategy: "absolute",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 15],
          },
        },
      ],
    });

    const progressBallMarkup = (
      <Box
        css={`
          border-radius: 100%;
          transition: transform 150ms ease;
          transform: scale(0);
        `}
        data-progress-ball
        $absolute
        $top={-1.37}
        $right="-7px"
        $width="14px"
        $height="14px"
        $bg={theme.colors.gold.darken(0.1)}
      />
    );

    const progressMarkup = (
      <>
        <Box
          style={{ right: `${100 * (1 - $progress)}%` }}
          $absolute
          $fill
          $bg={theme.colors.white.fade(0.85)}
        />
        <Box
          style={{ right: `${100 * (1 - $time)}%` }}
          $absolute
          $fill
          $bg={theme.colors.gold.darken(0.1)}
        >
          {progressBallMarkup}
        </Box>
      </>
    );

    return (
      <>
        <TimelineBase
          ref={ref}
          $height="4px"
          $bg={theme.colors.white.fade(0.85)}
          {...events}
        >
          {progressMarkup}
        </TimelineBase>
        <Box style={{ right: `${100 * (1 - $position)}%` }} $absolute>
          <Box ref={setReference} />
          <Activatable
            ref={setPopper}
            style={styles.popper}
            css={cssTextTimeline}
            $active={$active}
            $duration={150}
            {...attributes.popper}
          >
            {Time($position * $duration)}
          </Activatable>
        </Box>
      </>
    );
  }
);
