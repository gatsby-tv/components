import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  FrameContext,
  useToggle,
  useResizeObserver,
} from "@gatsby-tv/utilities";

import { MainFrame, TopFrame, SideFrame } from "./components";

const FrameStyle = styled.div`
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

export function Frame(props: FrameProps): React.ReactElement {
  const topframe = useRef<HTMLDivElement>(null);
  const sideframe = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState<number | undefined>(undefined);
  const [offsetY, setOffsetY] = useState<number | undefined>(undefined);
  const [fullscreen, toggleFullscreen, setFullscreen] = useToggle(false);

  useResizeObserver(sideframe, (content) => setOffsetX(content.inlineSize));
  useResizeObserver(topframe, (content) => setOffsetY(content.blockSize));

  const context = {
    fullscreen: fullscreen as boolean,
    toggleFullscreen,
    setFullscreen,
  };

  return (
    <FrameContext.Provider value={context}>
      <FrameStyle>
        <TopFrame ref={topframe} topbar={props.topbar}>
          <SideFrame ref={sideframe} sidebar={props.sidebar}>
            <MainFrame offsetX={offsetX} offsetY={offsetY}>
              {props.children}
            </MainFrame>
          </SideFrame>
        </TopFrame>
      </FrameStyle>
    </FrameContext.Provider>
  );
}
