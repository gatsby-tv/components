import React, { CSSProperties } from "react";
import { CSSProp } from "styled-components";

export interface EventHandler {
  (event: React.SyntheticEvent): void;
}

export interface Styleable {
  style?: CSSProperties;
  css?: CSSProp;
}

export type DisplaySize = "small" | "large";

export type IconSource = React.FC<React.SVGProps<SVGSVGElement>>;

export type Duration =
  | "instant"
  | "fast"
  | "base"
  | "slow"
  | "slower"
  | "slowest";

export type Border =
  | "none"
  | "smallest"
  | "small"
  | "base"
  | "large"
  | "largest";

export type Timing =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear"
  | "step-start"
  | "step-end";

export type Size = number | string;
export type Margin =
  | Size
  | [Size, Size]
  | [Size, Size, Size]
  | [Size, Size, Size, Size];

export interface Shape {
  width?: Size;
  height?: Size;
}

export type ColorHue =
  | "white"
  | "black"
  | "placeholder"
  | "gold"
  | "background";

export type ColorValue = number | string;

export type Color = ColorHue | [ColorHue, ColorValue];

export type FlexDistribute = "fill" | "fill-evenly";

export type FlexJustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "start"
  | "end"
  | "left"
  | "right";

export type FlexAlignItems =
  | "stretch"
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "first baseline"
  | "last baseline"
  | "start"
  | "end"
  | "self-start"
  | "self-end";

export type FlexAlignContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | "stretch"
  | "start"
  | "end"
  | "baseline"
  | "first baseline"
  | "last baseline";

export type GridJustifyItems = "start" | "end" | "center" | "stretch";

export type GridAlignItems = "start" | "end" | "center" | "stretch";

export type GridJustifyContent =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-around"
  | "space-between"
  | "space-evenly";

export type GridAlignContent =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "space-around"
  | "space-between"
  | "space-evenly";
