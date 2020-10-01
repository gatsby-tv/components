import React from "react";
import styled from "styled-components";

import { cssSize, cssColor } from "@app/styles/mixins";
import { BoxProps } from "@app/components";

export type ButtonProps = BoxProps & React.ButtonHTMLAttributes<HTMLElement>;

export const Button = styled.button<ButtonProps>`
  cursor: pointer;
  display: block;
  position: relative;
  ${(props) => cssColor("background-color", props.theme, props.bg)}
  ${(props) => cssColor("color", props.theme, props.fg)}
  ${(props) => cssSize("width", props.boxWidth)}
  ${(props) => cssSize("height", props.boxHeight)}
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
`;
