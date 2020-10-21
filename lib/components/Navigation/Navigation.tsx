import React from "react";
import { css } from "styled-components";

import { NavigationContext, ifNotExists } from "@lib/utilities";
import { Flex, Scroll } from "@lib/components";

import { Section, SectionProps, Item, ItemProps } from "./components";

export type { SectionProps as NavigationSectionProps };
export type { ItemProps as NavigationItemProps };

export interface NavigationProps {
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
  className?: string;
  row?: boolean;
  children?: React.ReactNode;
  scrollHidden?: boolean;
}

const NavigationBase: React.FC<NavigationProps> = (props) => {
  const style = css`
    > ${Section}:not(:first-child) {
      ${props.row ? "margin-left" : "margin-top"}: ${(props) => props.theme.spacing.base};
    }

    > ${Section}[data-flush] {
      ${props.row ? "margin-left" : "margin-top"}: auto;
    }

    ${Item} {
      cursor: pointer;
    }
  `;

  const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => props.row ? (
    <>{children}</>
  ) : (
    <Scroll vertical $hidden={props.scrollHidden}>{children}</Scroll>
  )

  return (
    <NavigationContext.Provider
      value={{ column: !props.row, selection: props.selection, onSelect: props.onSelect }}
    >
      <Container>
        <Flex
          as="nav"
          className={props.className}
          column={ifNotExists(props.row)}
          align="stretch"
          css={style}
        >
          {props.children}
        </Flex>
      </Container>
    </NavigationContext.Provider>
  );
};

export const Navigation = Object.assign(NavigationBase, { Section, Item });
