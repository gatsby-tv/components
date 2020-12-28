import React from "react";

import { Flex } from "@lib/components/Flex";

export interface TopFrameProps {
  children?: React.ReactNode;
  $topbar?: React.ReactNode;
}

export const TopFrame: React.FC<TopFrameProps> = (props) =>
  props.$topbar ? (
    <Flex $column $fill>
      <Flex.Item as="nav" $shrink={0}>
        {props.$topbar}
      </Flex.Item>
      <Flex.Item $shrink={1} $grow={1}>
        {props.children}
      </Flex.Item>
    </Flex>
  ) : (
    <>{props.children}</>
  );
