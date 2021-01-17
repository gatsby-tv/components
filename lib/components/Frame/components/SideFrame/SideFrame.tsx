import React from "react";

import { Flex } from "@lib/components/Flex";

export interface SideFrameProps {
  children?: React.ReactNode;
  sidebar?: React.FC<any>;
}

export function SideFrame(props: SideFrameProps): React.ReactElement {
  const { sidebar: Sidebar } = props;

  return Sidebar ? (
    <Flex expand>
      <Flex.Item shrink={0}>
        <Sidebar />
      </Flex.Item>
      <Flex.Item shrink={1} grow={1} basis={1}>
        {props.children}
      </Flex.Item>
    </Flex>
  ) : (
    <>{props.children}</>
  );
}
