import React from "react";
import { css } from "styled-components";

import { Item, ItemProps } from "./components";

import { SwitchContext } from "@app/utilities";
import { Connected, Flex } from "@app/components";

export type { ItemProps as SwitchItemProps };

export interface SwitchProps {
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
  className?: string;
  children?: React.ReactNode;
}

const wrapChildren = (children: React.ReactNode) =>
  React.Children.map(children, (child, index) => (
    <Connected.Item key={index}>{child}</Connected.Item>
  ));

const SwitchBase: React.FC<SwitchProps> = (props) => {
  const style = css`
    ${Item} {
      cursor: pointer;
    }
  `;

  return (
    <SwitchContext.Provider
      value={{ selection: props.selection, onSelect: props.onSelect }}
    >
      <Connected className={props.className} css={style} align="stretch">
        {wrapChildren(props.children)}
      </Connected>
    </SwitchContext.Provider>
  );
};

export const Switch = Object.assign(SwitchBase, { Item });
