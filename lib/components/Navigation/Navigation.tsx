import React from "react";
import { css } from "styled-components";

import { NavigationContext } from "@lib/utilities";
import { Flex, Scroll } from "@lib/components";

import { Section, SectionProps, Item, ItemProps } from "./components";

export type { SectionProps as NavigationSectionProps };
export type { ItemProps as NavigationItemProps };

export interface NavigationProps {
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
  className?: string;
  children?: React.ReactNode;
  scrollHidden?: boolean;
}

const NavigationBase: React.FC<NavigationProps> = (props) => {
  const style = css`
    > ${Section}:not(:first-child) {
      margin-top: ${(props) => props.theme.spacing.base};
    }

    > ${Section}[data-flush] {
      margin-top: auto;
    }

    ${Item} {
      cursor: pointer;
    }
  `;

  return (
    <NavigationContext.Provider
      value={{ selection: props.selection, onSelect: props.onSelect }}
    >
      <Scroll as="nav" vertical $hidden={props.scrollHidden}>
        <Flex className={props.className} column align="stretch" css={style}>
          {props.children}
        </Flex>
      </Scroll>
    </NavigationContext.Provider>
  );
};

export const Navigation = Object.assign(NavigationBase, { Section, Item });
