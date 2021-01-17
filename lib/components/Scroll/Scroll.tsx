import React, { useRef, useState, useCallback } from "react";
import styled from "styled-components";
import {
  ifExists,
  ifNotExists,
  ScrollContext,
  useParentRef,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { cssSize } from "@lib/styles/size";
import { EventHandler, Size } from "@lib/types";

export interface ScrollProps {
  children?: React.ReactNode;
  hide?: boolean;
  maxh?: Size;
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
  const scroll = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const parent = useParentRef<HTMLDivElement>(container);
  const scrollPosition = useRef<number>(0);

  useResizeObserver(parent, (content) => setHeight(content.blockSize));

  const addScrollListener = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => [...current, callback]),
    []
  );

  const removeScrollListener = useCallback(
    (callback: EventHandler) =>
      setCallbacks((current) => current.filter((entry) => entry !== callback)),
    []
  );

  const handleScroll: EventHandler = useCallback(
    (event) => {
      if (scroll.current) {
        scrollPosition.current = scroll.current.scrollTop;
      }
      callbacks.forEach((callback) => callback(event));
    },
    [callbacks]
  );

  const setScrollPosition = useCallback((value: number) => {
    scrollPosition.current = value;
    if (scroll.current) {
      scroll.current.scrollTop = value;
    }
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        scrollPosition,
        setScrollPosition,
        addScrollListener,
        removeScrollListener,
      }}
    >
      <Box
        ref={container}
        absolute={ifNotExists(props.maxh)}
        expand
        h={ifExists(height && ifNotExists(props.maxh), `${height}px`)}
        maxh={props.maxh}
      >
        <ScrollBase ref={scroll} onScroll={handleScroll} {...props}>
          {props.children}
        </ScrollBase>
      </Box>
    </ScrollContext.Provider>
  );
}
