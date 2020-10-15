import styled from "styled-components";

import { ifExists, ifNotExists } from "@app/utilities";
import { Size, Styleable } from "@app/types";
import { cssSize, cssProperty } from "@app/styles";

export interface BoxProps extends Styleable {
  bg?: string;
  fg?: string;
  absolute?: boolean;
  $fill?: boolean;
  $width?: Size;
  $height?: Size;
  top?: Size;
  right?: Size;
  bottom?: Size;
  left?: Size;
  maxWidth?: Size;
  maxHeight?: Size;
  minWidth?: Size;
  minHeight?: Size;
  margin?: Size;
  marginTop?: Size;
  marginRight?: Size;
  marginBottom?: Size;
  marginLeft?: Size;
  padding?: Size;
  paddingTop?: Size;
  paddingRight?: Size;
  paddingBottom?: Size;
  paddingLeft?: Size;
  zIndex?: number;
}

export const Box = styled.div<BoxProps>`
  display: block;
  ${(props) =>
    cssProperty("position", ifExists(props.absolute, "absolute"), "relative")}
  ${(props) => cssProperty("background-color", props.bg)}
  ${(props) => cssProperty("color", props.fg)}
  ${(props) =>
    cssSize(
      "width",
      props.$width,
      ifNotExists(props.absolute) && ifExists(props.$fill, 1)
    )}
  ${(props) =>
    cssSize(
      "height",
      props.$height,
      ifNotExists(props.absolute) && ifExists(props.$fill, 1)
    )}
  ${(props) =>
    cssSize(
      "top",
      props.top,
      ifExists(props.absolute) && ifExists(props.$fill, 0)
    )}
  ${(props) =>
    cssSize(
      "right",
      props.right,
      ifExists(props.absolute) && ifExists(props.$fill, 0)
    )}
  ${(props) =>
    cssSize(
      "bottom",
      props.bottom,
      ifExists(props.absolute) && ifExists(props.$fill, 0)
    )}
  ${(props) =>
    cssSize(
      "left",
      props.left,
      ifExists(props.absolute) && ifExists(props.$fill, 0)
    )}
  ${(props) => cssSize("max-width", props.maxWidth)}
  ${(props) => cssSize("max-height", props.maxHeight)}
  ${(props) => cssSize("min-width", props.minWidth)}
  ${(props) => cssSize("min-height", props.minHeight)}
  ${(props) => cssSize("margin", props.margin)}
  ${(props) => cssSize("margin-top", props.marginTop)}
  ${(props) => cssSize("margin-right", props.marginRight)}
  ${(props) => cssSize("margin-bottom", props.marginBottom)}
  ${(props) => cssSize("margin-left", props.marginLeft)}
  ${(props) => cssSize("padding", props.padding)}
  ${(props) => cssSize("padding-top", props.paddingTop)}
  ${(props) => cssSize("padding-right", props.paddingRight)}
  ${(props) => cssSize("padding-bottom", props.paddingBottom)}
  ${(props) => cssSize("padding-left", props.paddingLeft)}
  ${(props) => cssProperty("z-index", String(props.zIndex))}
`;
