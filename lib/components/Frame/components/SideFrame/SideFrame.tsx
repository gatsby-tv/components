import React from "react";

import { Flex } from "@lib/components/Flex";

export interface SideFrameProps {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const SideFrame: React.FC<SideFrameProps> = (props) =>
  props.sidebar ? (
    <Flex>
      <Flex.Item shrink={0}>{props.sidebar}</Flex.Item>
      <Flex.Item shrink={0}>{props.children}</Flex.Item>
    </Flex>
  ) : (
    <>{props.children}</>
  );
