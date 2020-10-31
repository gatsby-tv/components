import React, { useState } from "react";
import styled from "styled-components";

import { ifExists, ifNotExists } from "@lib/utilities/if-exists";
import { ScrollContext } from "@lib/utilities/scroll";
import { cssProperty } from "@lib/styles/property";
import { EventHandler } from "@lib/types";

export interface ScrollProps {
  children?: React.ReactNode;
  $hidden?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
}

const ScrollBase = styled.div<ScrollProps>`
  height: 100%;
  ${(props) => cssProperty("overflow-y", ifExists(props.vertical, "auto"))}
  ${(props) => cssProperty("overflow-x", ifExists(props.horizontal, "auto"))}
  ${(props) => cssProperty("padding-right", ifNotExists(props.$hidden, "1rem"))}
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
