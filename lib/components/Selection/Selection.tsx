import React from "react";
import { css } from "styled-components";

import { SelectionContext } from "@lib/utilities/selection";
import { ifNotExists } from "@lib/utilities/if-exists";
import { Flex } from "@lib/components/Flex";
import { Scroll } from "@lib/components/Scroll";

import { Section, SectionProps, Item, ItemProps } from "./components";

export type { SectionProps as SelectionSectionProps };
export type { ItemProps as SelectionItemProps };

export interface SelectionProps {
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
  className?: string;
  row?: boolean;
  children?: React.ReactNode;
  scrollHidden?: boolean;
}

function SelectionBase(props: SelectionProps) {
  const style = css`
    > ${Section}:not(:first-child) {
      ${props.row ? "margin-left" : "margin-top"}: ${(props) =>
        props.theme.spacing.base};
    }

    > ${Section}[data-flush] {
      ${props.row ? "margin-left" : "margin-top"}: auto;
    }

    ${Item} {
      cursor: pointer;
    }
  `;

  const Container: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    props.row ? (
      <>{children}</>
    ) : (
      <Scroll $hidden={props.scrollHidden}>{children}</Scroll>
    );

  return (
    <SelectionContext.Provider
      value={{
        column: !props.row,
        selection: props.selection,
        onSelect: props.onSelect,
      }}
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
    </SelectionContext.Provider>
  );
}

export const Selection = Object.assign(SelectionBase, { Section, Item });
