import React, { useState } from "react";
import styled from "styled-components";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { ScrollContext } from "@lib/utilities/scroll";

export interface ScrollProps {
  children?: React.ReactNode;
  $hidden?: boolean;
}

const ScrollBase = styled.div<ScrollProps>`
  min-width: 100%;
  max-height: 100%;
  box-sizing: content-box;
  overflow-y: scroll;
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    width: ${(props) => (props.$hidden ? "0" : "1rem")};
    height: ${(props) => (props.$hidden ? "0" : "1rem")};
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.$hidden ? "transparent" : props.theme.colors.background[3]};
    border-radius: 2rem;
    transition: all 100ms ease;
  }
`;

export function Scroll(props: ScrollProps) {
  const [callbacks, setCallbacks] = useState<EventHandler[]>([]);
  const addCallback = (callback: EventHandler) =>
    setCallbacks((current) => [...current, callback]);
  const handleScroll: EventHandler = (event) =>
    callbacks.forEach((callback) => callback(event));

  return (
    <ScrollContext.Provider value={addCallback}>
      <ScrollBase onScroll={handleScroll} {...props}>
        {props.children}
      </ScrollBase>
    </ScrollContext.Provider>
  );
}
