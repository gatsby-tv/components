import React from "react";
import { css } from "styled-components";
import { ifNotExists } from "@gatsby-tv/utilities";

import { FlexAlignItems } from "@lib/types";
import { SelectionContext } from "@lib/utilities/selection";
import { Flex } from "@lib/components/Flex";
import { Scroll } from "@lib/components/Scroll";
import { Optional } from "@lib/components/Optional";

import { Section, SectionProps, Item, ItemProps } from "./components";

export type { SectionProps as SelectionSectionProps };
export type { ItemProps as SelectionItemProps };

export interface SelectionProps {
  children?: React.ReactNode;
  className?: string;
  selection: Record<string, boolean>;
  row?: boolean;
  scrollHidden?: boolean;
  onSelect: (id: string) => void;
}

function SelectionBase(props: SelectionProps): React.ReactElement {
  const {
    children,
    className,
    selection,
    row,
    scrollHidden = true,
    onSelect,
  } = props;

  const style = css`
    > ${Section}:not(:first-child) {
      ${props.row ? "margin-left" : "margin-top"}: ${(props) =>
        props.theme.spacing[1.5]};
    }

    > ${Section}[data-flush] {
      ${props.row ? "margin-left" : "margin-top"}: auto;
    }

    ${Item} {
      cursor: pointer;
    }
  `;

  const context = {
    column: !row,
    selection,
    onSelect,
  };

  const optionalProps = {
    active: !row,
    $props: { hide: scrollHidden },
  };

  const flexProps = {
    className,
    column: ifNotExists(row),
    align: "stretch" as FlexAlignItems,
  };

  return (
    <SelectionContext.Provider value={context}>
      <Optional component={Scroll} {...optionalProps}>
        <Flex as="nav" css={style} {...flexProps}>
          {children}
        </Flex>
      </Optional>
    </SelectionContext.Provider>
  );
}

export const Selection = Object.assign(SelectionBase, {
  Section,
  Item,
  displayName: "Selection",
});
