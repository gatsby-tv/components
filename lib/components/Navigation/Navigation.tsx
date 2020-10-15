import React from "react";
import styled, { css } from "styled-components";

import { NavigationContext } from "@app/utilities";
import { Flex, Scroll } from "@app/components";

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
  const navigationStyle = css`
    & > ul:not(:first-child) {
      margin-top: ${(props) => props.theme.spacing.base};
    }

    & > ul[data-flush] {
      margin-top: auto;
    }

    & li {
      cursor: pointer;
    }
  `;

  return (
    <NavigationContext.Provider
      value={{ selection: props.selection, onSelect: props.onSelect }}
    >
      <Scroll as="nav" vertical $hidden={props.scrollHidden}>
        <Flex
          className={props.className}
          column
          align="stretch"
          css={navigationStyle}
        >
          {props.children}
        </Flex>
      </Scroll>
    </NavigationContext.Provider>
  );
};

export const Navigation = styled(
  Object.assign(NavigationBase, { Section, Item })
)``;
