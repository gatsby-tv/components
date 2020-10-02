import styled from "styled-components";

import { Size } from "@app/types";
import { cssSize } from "@app/styles";
import { Box, BoxProps } from "@app/components";

export type CircleProps = { size?: Size } & BoxProps;

export const Circle = styled(Box)<CircleProps>`
  ${(props) => cssSize("width", props.size)}
  ${(props) => cssSize("height", props.size)}
  border-radius: 100%;
`;
