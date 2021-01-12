import React from "react";

import { Box } from "@lib/components/Box";
import { Scroll } from "@lib/components/Scroll";

export interface MainFrameProps {
  children?: React.ReactNode;
}

export function MainFrame(props: MainFrameProps): React.ReactElement {
  return (
    <Box as="main" expand>
      <Scroll>{props.children}</Scroll>
    </Box>
  );
}
