import React from "react";
import styled, { DefaultTheme } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { MetaSize } from "@lib/types";
import { cssTextMeta, cssTextSubdued } from "@lib/styles/typography";
import { Flex } from "@lib/components/Flex";

import { Item, ItemProps } from "../Item";

type ListBaseProps = ItemProps;

const getSpacing = (theme: DefaultTheme, size?: MetaSize) => {
  if (size === "large") {
    return theme.spacing.tight;
  } else {
    return theme.spacing.extraTight;
  }
};

const ListBase = styled(Flex)<ListBaseProps>`
  & > ${Item} {
    ${(props) => ifExists(props.subdued, cssTextSubdued)}
    ${(props) => cssTextMeta(props.font ?? "medium", props.bold)}
  }

  & > ${Item}:not(:last-child):after {
    content: "•";
    margin: 0 ${(props) => getSpacing(props.theme, props.font)};
  }
`;

export interface ListProps extends ListBaseProps {
  children?: React.ReactNode;
}

export const List: React.FC<ListProps> = (props: ListProps) => (
  <ListBase as="span" align="center" {...props}>
    {props.children}
  </ListBase>
);
