import React from "react";
import styled from "styled-components";

import { Box } from "@lib/components/Box";
import { Scroll } from "@lib/components/Scroll";

export interface MainFrameProps {
  children?: React.ReactNode;
}

export function MainFrame(props: MainFrameProps) {
  return (
    <Box as="main" $fill>
      <Scroll>{props.children}</Scroll>
    </Box>
  );
}
