import styled from "styled-components";

import { cssProperty } from "@app/styles";
import { ifExists, ifNotExists } from "@app/utilities";
import { Box, BoxProps } from "@app/components";

export interface ActivatableProps extends BoxProps {
  active?: boolean;
  duration?: number;
  delay?: number;
}

export const Activatable = styled(Box)<ActivatableProps>`
  opacity: ${(props) => (props.active ? 1 : 0)};
  transition: opacity
    ${(props) =>
      props.duration ? `${props.duration}ms` : props.theme.duration.base}
    ease;
  ${(props) =>
    cssProperty(
      "transition-delay",
      ifExists(props.active) && ifExists(props.delay, `${props.delay}ms`)
    )}
`;
