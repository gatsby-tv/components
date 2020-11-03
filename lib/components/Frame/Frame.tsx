import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { Scroll } from "@lib/components/Scroll";
import { FrameContext } from "@lib/utilities/frame";

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
  topbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export function Frame(props: FrameProps) {
  const [loadingSemaphore, setLoadingSemaphore] = useState(0);

  const startLoading = useCallback(
    () => setLoadingSemaphore((value) => value + 1),
    []
  );
  const stopLoading = useCallback(
    () => setLoadingSemaphore((value) => Math.max(0, value - 1)),
    []
  );

  const context = {
    startLoading,
    stopLoading,
    isLoading: loadingSemaphore !== 0,
  };

  return (
    <FrameContext.Provider value={context}>
      <FrameBase>
        <TopFrame topbar={props.topbar}>
          <SideFrame sidebar={props.sidebar}>
            <MainFrame>{props.children}</MainFrame>
          </SideFrame>
        </TopFrame>
      </FrameBase>
    </FrameContext.Provider>
  );
}
