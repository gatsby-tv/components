import styled from "styled-components";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";
import { Box, BoxProps } from "@lib/components/Box";

export type CircleProps = { size?: Size } & BoxProps;

export const Circle = styled(Box)<CircleProps>`
  ${(props) => cssSize("width", props.size)}
  ${(props) => cssSize("height", props.size)}
  border-radius: 100%;
`;
