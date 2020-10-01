import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  CSSProperties,
} from "react";

import { Box, Position } from "@app/components";
import { EventHandler } from "@app/types";
import { ViewportContext } from "@app/util/viewport";

export interface ViewportProps {
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  aspectRatio?: number;
}

export const Viewport: React.FC<ViewportProps> = (props) => {
  const video = useRef(null);
  const viewport = useRef(null);
  const [handlers, setHandlers] = useState<EventHandler[]>([]);

  const context = {
    viewport,
    video,
    handlers,
    addHandler: useCallback(
      (handler: EventHandler) =>
        setHandlers((current) => [...current, handler]),
      []
    ),
  };

  const style: CSSProperties = {
    paddingTop: `${100 * (props.aspectRatio ?? 9 / 16)}%`,
  };

  return (
    <ViewportContext.Provider value={context}>
      <Box ref={viewport} as="figure" style={style} boxWidth="100%" bg="black">
        <Position fill>
          <Box boxWidth="100%" boxHeight="100%">
            {props.children}
          </Box>
          <Position fill>{props.overlay}</Position>
        </Position>
      </Box>
    </ViewportContext.Provider>
  );
};
