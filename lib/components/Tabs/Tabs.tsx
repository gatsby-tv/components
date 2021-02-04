import React from "react";
import { css } from "styled-components";

import { Size } from "@lib/types";
import { cssTextTab } from "@lib/styles/typography";
import { cssSize } from "@lib/styles/size";
import { Selection, SelectionItemProps } from "@lib/components/Selection";

import { Link, LinkProps } from "./components/Link";

export type { SelectionItemProps as TabsItemProps };
export type { LinkProps as TabsLinkProps };

export interface TabsProps {
  children?: React.ReactNode;
  w?: Size;
  h?: Size;
  font?: string;
  gap?: Size;
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

function TabsBase(props: TabsProps): React.ReactElement {
  const style = css`
    ${cssSize("width", props.w)}
    ${cssSize("height", props.h, 1)}
    ${cssSize("gap", props.gap)}

    ${Selection.Item} {
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 0;
      padding-bottom: 2px;
      ${cssTextTab(props.font)}
    }

    ${Selection.Item} > a {
      height: 100%;
    }

    ${Selection.Item}[data-selected], ${Selection.Item}:hover {
      color: ${(props) => props.theme.colors.gold.lighten(0.1)};
    }

    ${Selection.Item}:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${(props) => props.theme.colors.gold};
      transform: scaleX(0);
      transition: transform ${(props) => props.theme.duration.fast} ease;
    }

    ${Selection.Item}[data-selected]:after {
      transform: scaleX(1);
    }
  `;

  return (
    <Selection
      css={style}
      row
      selection={props.selection}
      onSelect={props.onSelect}
    >
      {props.children}
    </Selection>
  );
}

export const Tabs = Object.assign(TabsBase, { Item: Selection.Item, Link });
