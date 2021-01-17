import styled, { css } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import {
  Size,
  FlexDistribute,
  FlexJustifyContent,
  FlexAlignItems,
  FlexAlignContent,
} from "@lib/types";
import { Box, BoxProps } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";
import { cssFlexGap, cssFlexDistribute, cssFlexGroups } from "@lib/styles/flex";
import { cssSize } from "@lib/styles/size";

import { Item, ItemProps } from "./components";

export type { ItemProps as FlexItemProps };

export interface FlexProps extends BoxProps {
  center?: boolean;
  column?: boolean;
  reverse?: boolean;
  groups?: number;
  distribute?: FlexDistribute;
  justify?: FlexJustifyContent;
  align?: FlexAlignItems;
  alignContent?: FlexAlignContent;
  gap?: Size;
}

const FlexBase = styled(Box)<FlexProps>`
  display: flex;
  ${(props) =>
    cssProperty(
      "flex-direction",
      ifExists(props.column, props.reverse ? "column-reverse" : "column"),
      ifExists(props.reverse, "row-reverse")
    )}
  ${(props) =>
    cssProperty(
      "justify-content",
      props.justify,
      ifExists(props.center, "center")
    )}
  ${(props) =>
    cssProperty("align-items", props.align, ifExists(props.center, "center"))}
  ${(props) => cssProperty("align-content", props.alignContent)}
  ${(props) => cssFlexGap(props.gap, props.column, props.groups)}
  ${(props) => cssFlexDistribute(`${Item}`, props.distribute)}
  ${(props) => cssFlexGroups(`${Item}`, props.groups, props.gap)}
`;

export const Flex = Object.assign(FlexBase, { Item });
