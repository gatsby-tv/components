import styled from "styled-components";

import { Box, BoxProps } from "@app/components";
import { Size } from "@app/types";
import { cssSize } from "@app/styles/mixins";

export interface RoundedBoxProps extends BoxProps {
  radius?: Size;
}

export const RoundedBox = styled(Box)<RoundedBoxProps>`
  ${(props) => cssSize("border-radius", props.radius)}
`;
