import styled from "styled-components";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";

export interface RuleProps {
  $width?: Size;
  $margin?: Size;
}

export const Rule = styled.hr<RuleProps>`
  border: solid;
  border-width: thin;
  border-color: ${(props) => props.theme.colors.background[3]};
  ${(props) => cssSize("width", props.$width)}
  ${(props) => cssSize("margin-top", props.$margin)}
  ${(props) => cssSize("margin-bottom", props.$margin)}
`;
