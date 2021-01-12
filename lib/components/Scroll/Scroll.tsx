import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import {
  ifExists,
  ScrollContext,
  useParentRef,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { EventHandler } from "@lib/types";

export interface ScrollProps {
  children?: React.ReactNode;
  hide?: boolean;
}

const ScrollBase = styled.div<ScrollProps>`
  min-width: 100%;
  max-height: 100%;
  box-sizing: content-box;
  overflow-y: scroll;
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    width: ${(props) => (props.hide ? "0" : "1rem")};
    height: ${(props) => (props.hide ? "0" : "1rem")};
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.hide ? "transparent" : props.theme.colors.background[3]};
    border-radius: 2rem;
    transition: all 100ms ease;
  }
`;

export function Scroll(props: ScrollProps): React.ReactElement {
  const [callbacks, setCallbacks] = useState<EventHandler[]>([]);
  const [height, setHeight] = useState<number | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);
  const container = useParentRef<HTMLDivElement>(ref);

  useResizeObserver(container, (content) => setHeight(content.blockSize));

  const addCallback = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => [...current, callback]),
    []
  );

  const removeCallback = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => current.filter((entry) => entry !== callback)),
    []
  );

  const handleScroll: EventHandler = useCallback(
    (event) => callbacks.forEach((callback) => callback(event)),
    [callbacks]
  );

  return (
    <ScrollContext.Provider value={[addCallback, removeCallback]}>
      <Box ref={ref} absolute expand h={ifExists(height, `${height}px`)}>
        <ScrollBase onScroll={handleScroll} {...props}>
          {props.children}
        </ScrollBase>
      </Box>
    </ScrollContext.Provider>
  );
}
