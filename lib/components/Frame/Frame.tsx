import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  FrameContext,
  useToggle,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { MainFrame, TopFrame, SideFrame } from "./components";

const FrameBase = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export interface FrameProps {
  children?: React.ReactNode;
  topbar?: React.FC<any>;
  sidebar?: React.FC<any>;
}

export function Frame(props: FrameProps) {
  const topframe = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<number | undefined>(undefined);
  const [fullscreen, toggleFullscreen, setFullscreen] = useToggle(false);

  useResizeObserver(topframe, (content) => setOffset(content.blockSize));

  return (
    <FrameContext.Provider
      value={{
        fullscreen: fullscreen as boolean,
        toggleFullscreen,
        setFullscreen,
      }}
    >
      <FrameBase>
        <TopFrame ref={topframe} topbar={props.topbar}>
          <SideFrame sidebar={props.sidebar}>
            <MainFrame offset={offset}>{props.children}</MainFrame>
          </SideFrame>
        </TopFrame>
      </FrameBase>
    </FrameContext.Provider>
  );
}
