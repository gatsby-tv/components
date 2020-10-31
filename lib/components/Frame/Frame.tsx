import React, { useState, useCallback } from "react";
import { css } from "styled-components";

import { Box } from "@lib/components/Box";
import { EventListener } from "@lib/components/EventListener";
import { FrameContext } from "@lib/utilities/frame";

import { NavFrame, SideFrame, MainFrame } from "./components";

export interface FrameProps {
  children?: React.ReactNode;
  navbar?: React.ReactNode;
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
      <Box
        absolute
        $fill
        css={`
          position: fixed;
        `}
      >
        <NavFrame navbar={props.navbar}>
          <SideFrame sidebar={props.sidebar}>
            <MainFrame>{props.children}</MainFrame>
          </SideFrame>
        </NavFrame>
      </Box>
    </FrameContext.Provider>
  );
}
