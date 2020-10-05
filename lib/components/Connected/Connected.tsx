import React from "react";

import { Flex } from "@app/components";

import { Item, ItemProps } from "./components";

export type { ItemProps as ConnectedItemProps };

export interface ConnectedProps {
  children?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  column?: boolean;
}

const ConnectedBase: React.FC<ConnectedProps> = (props) => {
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

export const Connected = Object.assign(ConnectedBase, { Item });
