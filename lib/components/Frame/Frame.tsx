import React, { useState, useCallback } from "react";
import { css } from "styled-components";

import { Box, EventListener } from "@lib/components";
import { FrameContext } from "@lib/utilities";

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
