import styled from "styled-components";

import { Box, BoxProps } from "@app/components";

export interface ActivatableProps extends BoxProps {
  active?: boolean;
}

export const Activatable = styled(Box)<ActivatableProps>`
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity ${(props) => props.theme.duration.base} ease;
`;
