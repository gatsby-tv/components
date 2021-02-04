import React from "react";
import { ifExists } from "@gatsby-tv/utilities";

import { Size } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Scroll } from "@lib/components/Scroll";

export interface MainFrameProps {
  children?: React.ReactNode;
  offsetX?: number;
  offsetY?: number;
}

export function MainFrame(props: MainFrameProps): React.ReactElement {
  const { offsetX, offsetY } = props;

  return (
    <Box as="main" expand>
      <Scroll
        maxw={offsetX ? `calc(100vw - ${offsetX}px)` : "100vw"}
        maxh={offsetY ? `calc(100vh - ${offsetY}px)` : "100vh"}
      >
        {props.children}
      </Scroll>
    </Box>
  );
}
