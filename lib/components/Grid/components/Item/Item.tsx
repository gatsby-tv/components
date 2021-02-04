import styled from "styled-components";
import { Tuple, TupleType } from "@gatsby-tv/utilities";

import { Box, BoxProps } from "@lib/components/Box";
import { cssProperty } from "@lib/styles/property";

export interface ItemProps extends BoxProps {
  columns?: TupleType<number, number>;
  rows?: TupleType<number, number>;
}

export const Item = styled(Box)<ItemProps>`
  ${(props) =>
    cssProperty("grid-column-start", Tuple.first(props.columns)?.toString())}
  ${(props) =>
    cssProperty("grid-column-end", Tuple.second(props.columns)?.toString())}
  ${(props) =>
    cssProperty("grid-row-start", Tuple.first(props.rows)?.toString())}
  ${(props) =>
    cssProperty("grid-row-end", Tuple.second(props.rows)?.toString())}
`;
