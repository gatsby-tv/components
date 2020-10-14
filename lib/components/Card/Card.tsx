import styled from "styled-components";

import { Box, BoxProps } from "@app/components";

export type CardProps = BoxProps;

export const Card = styled(Box)<CardProps>`
  border-radius: ${(props) => props.theme.border.radius.base};
  overflow: hidden;
`;
