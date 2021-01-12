import React, { useRef, useState, useEffect } from "react";
import { css } from "styled-components";
import type { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { cssProperty } from "@lib/styles/property";
import { Box } from "@lib/components/Box";
import { Portal } from "@lib/components/Portal";

export interface TooltipProps {
  children?: React.ReactNode;
  for: React.RefObject<HTMLElement>;
  fade?: boolean;
  delay?: number;
  fixed?: boolean;
  offset?: number;
  placement?: Placement;
  pointer?: boolean;
}

export function Tooltip(props: TooltipProps): React.ReactElement {
  const { fade, delay } = props;
  const [active, setActive] = useState(false);
  const popper = useRef<HTMLDivElement>(null);
  const { styles, attributes } = usePopper(props.for.current, popper.current, {
    placement: props.placement,
    strategy: props.fixed ? "fixed" : "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, props.offset ?? 10],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
        },
      },
      {
        name: "flip",
      },
    ],
  });

  const popperStyle = css`
    ${cssProperty("pointer-events", ifNotExists(props.pointer, "none"))}

    & > * {
      opacity: 0;
      animation-name: appear;
      animation-duration: ${(props) => (fade ? props.theme.duration.fast : 0)};
      animation-fill-mode: forwards;
      animation-delay: ${ifExists(fade && delay, `${delay}ms`)};
    }

    @keyframes appear {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }
  `;

  useEffect(() => {
    const mouseEnterHandler = () => setActive(true);
    const mouseLeaveHandler = () => setActive(false);
    props.for.current?.addEventListener("mouseenter", mouseEnterHandler);
    props.for.current?.addEventListener("mouseleave", mouseLeaveHandler);
    return () => {
      props.for.current?.removeEventListener("mouseenter", mouseEnterHandler);
      props.for.current?.removeEventListener("mouseleave", mouseLeaveHandler);
    };
  }, []);

  return (
    <Portal id="tooltip">
      {active && (
        <Box
          ref={popper}
          css={popperStyle}
          style={styles.popper}
          {...attributes.popper}
        >
          {props.children}
        </Box>
      )}
    </Portal>
  );
}
