import styled from "styled-components";

import { Size, Margin } from "@lib/types";
import { cssSize, cssMargin } from "@lib/styles/size";

export interface RuleProps {
  w?: Size;
  margin?: Margin;
  thin?: boolean;
}

export const Rule = styled.hr<RuleProps>`
  border: none;
  height: ${(props) => (props.thin ? "1px" : "2px")};
  background-color: ${(props) => props.theme.colors.background[3]};
  ${(props) => cssSize("width", props.w)}
  ${(props) => cssMargin("margin", props.margin)}
`;
