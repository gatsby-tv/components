import styled from "styled-components";

import { Box, BoxProps } from "@app/components";

export interface ItemProps extends BoxProps {
  grow?: number;
  shrink?: number;
  basis?: number | "auto";
}

export const Item = styled(Box)<ItemProps>`
  flex-grow: ${(props) => props.grow ?? 0};
  flex-shrink: ${(props) => props.shrink ?? 1};
  flex-basis: ${(props) => props.basis ?? "auto"};
`;
