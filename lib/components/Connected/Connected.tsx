import React from "react";

import { Flex } from "@app/components";

import { Item } from "./components";

export interface ConnectedProps {
  children?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  column?: boolean;
}

export const Connected: React.FC<ConnectedProps> = (props) => {
  const leftMarkup = props.left ? (
    <Item connection column={props.column}>
      {props.left}
    </Item>
  ) : null;

  const rightMarkup = props.right ? (
    <Item connection column={props.column}>
      {props.right}
    </Item>
  ) : null;

  return (
    <Flex column={props.column}>
      {leftMarkup}
      <Item column={props.column}>{props.children}</Item>
      {rightMarkup}
    </Flex>
  );
};
