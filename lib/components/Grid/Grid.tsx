import styled from "styled-components";
import { ifExists, Tuple, TupleType } from "@gatsby-tv/utilities";

import {
  Size,
  GridJustifyItems,
  GridJustifyContent,
  GridAlignItems,
  GridAlignContent,
} from "@lib/types";
import { Box, BoxProps } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";
import { cssSize } from "@lib/styles/size";

import { Item, ItemProps } from "./components/Item";

export type { ItemProps as GridItemProps };

export interface GridProps extends BoxProps {
  template?: TupleType<string, string>;
  center?: boolean;
  justify?: TupleType<GridJustifyItems, GridJustifyContent>;
  align?: TupleType<GridAlignItems, GridAlignContent>;
  gap?: TupleType<Size, Size>;
}

const GridBase = styled(Box)<GridProps>`
  display: grid;
  ${(props) =>
    cssProperty("grid-template-columns", Tuple.first(props.template))}
  ${(props) => cssProperty("grid-template-rows", Tuple.second(props.template))}
  ${(props) =>
    cssProperty(
      "justify-items",
      Tuple.first(props.justify),
      ifExists(props.center, "center")
    )}
  ${(props) => cssProperty("justify-content", Tuple.second(props.justify))}
  ${(props) =>
    cssProperty(
      "align-items",
      Tuple.first(props.align),
      ifExists(props.center, "center")
    )}
  ${(props) => cssProperty("align-content", Tuple.second(props.align))}
  ${(props) => cssSize("column-gap", Tuple.first(props.gap))}
  ${(props) =>
    cssSize("row-gap", Tuple.second(props.gap), Tuple.first(props.gap))}
`;

export const Grid = Object.assign(GridBase, { Item });
