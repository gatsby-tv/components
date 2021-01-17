import React from "react";
import { ifExists } from "@gatsby-tv/utilities";

import { Size } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Scroll } from "@lib/components/Scroll";

export interface MainFrameProps {
  children?: React.ReactNode;
  offset?: number;
}

export function MainFrame(props: MainFrameProps): React.ReactElement {
  return (
    <Box as="main" expand>
      <Scroll maxh={ifExists(props.offset, `calc(100vh - ${props.offset}px)`)}>
        {props.children}
      </Scroll>
    </Box>
  );
}
