import React, { useState, useCallback } from "react";

import { Position, EventListener } from "@app/components";
import { FrameContext } from "@app/util/frame";

import { NavFrame, SideFrame, MainFrame } from "./components";

export interface FrameProps {
  children?: React.ReactNode;
  navbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Frame: React.FC<FrameProps> = (props) => {
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
      <Position fill fixed>
        <NavFrame navbar={props.navbar}>
          <SideFrame sidebar={props.sidebar}>
            <MainFrame>{props.children}</MainFrame>
          </SideFrame>
        </NavFrame>
      </Position>
    </FrameContext.Provider>
  );
};
