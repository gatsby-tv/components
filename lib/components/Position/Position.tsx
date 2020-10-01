import styled from "styled-components";

import { cssSize } from "@app/styles/mixins";
import { Size, Styleable } from "@app/types";

export interface PositionProps extends Styleable {
  fixed?: boolean;
  fill?: boolean;
  top?: Size;
  right?: Size;
  bottom?: Size;
  left?: Size;
}

export const Position = styled.div<PositionProps>`
  display: block;
  position: ${(props) => (props.fixed ? "fixed" : "absolute")};
  ${(props) => cssSize("top", props.top, (props.fill || undefined) && 0)}
  ${(props) => cssSize("right", props.right, (props.fill || undefined) && 0)}
  ${(props) => cssSize("bottom", props.bottom, (props.fill || undefined) && 0)}
  ${(props) => cssSize("left", props.left, (props.fill || undefined) && 0)}
`;
