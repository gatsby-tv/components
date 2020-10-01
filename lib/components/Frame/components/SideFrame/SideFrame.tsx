import React from "react";

import { Flex } from "@app/components";

export interface SideFrameProps {
  children?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const SideFrame: React.FC<SideFrameProps> = (props) => {
  return props.sidebar ? (
    <Flex>
      <Flex.Item shrink={0}>{props.sidebar}</Flex.Item>
      <Flex.Item shrink={0}>{props.children}</Flex.Item>
    </Flex>
  ) : (
    <>{props.children}</>
  );
};
