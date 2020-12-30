import React from "react";
import { css } from "styled-components";

import { SwitchContext } from "@lib/utilities/switch";
import { Connected } from "@lib/components/Connected";

import { Item, ItemProps } from "./components";

export type { ItemProps as SwitchItemProps };

export interface SwitchProps {
  children?: React.ReactNode;
  className?: string;
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

const wrapChildren = (children: React.ReactNode) =>
  React.Children.map(children, (child, index) => (
    <Connected.Item key={index}>{child}</Connected.Item>
  ));

function SwitchBase(props: SwitchProps) {
  const style = css`
    ${Item} {
      cursor: pointer;
    }
  `;

  return (
    <SwitchContext.Provider
      value={{ selection: props.selection, onSelect: props.onSelect }}
    >
      <Connected className={props.className} css={style} $align="stretch">
        {wrapChildren(props.children)}
      </Connected>
    </SwitchContext.Provider>
  );
}

export const Switch = Object.assign(SwitchBase, { Item });
