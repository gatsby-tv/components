import React from "react";

import { Flex } from "@app/components";

export interface NavFrameProps {
  children?: React.ReactNode;
  navbar?: React.ReactNode;
}

export const NavFrame: React.FC<NavFrameProps> = (props) => {
  return props.navbar ? (
    <Flex column>
      <Flex.Item shrink={0}>{props.navbar}</Flex.Item>
      <Flex.Item shrink={0}>{props.children}</Flex.Item>
    </Flex>
  ) : (
    <>{props.children}</>
  );
};