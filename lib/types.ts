import React, { CSSProperties } from "react";
import { CSSProp } from "styled-components";

export interface EventHandler {
  (event: React.SyntheticEvent): void;
}

export interface Styleable {
  style?: CSSProperties;
  css?: CSSProp;
}

export type IconSource = React.FC<React.SVGProps<SVGSVGElement>>;

export type AvatarSize = "small" | "medium" | "large" | "extraLarge";

export type FontSize =
  | "heading"
  | "subheading"
  | "extraSmall"
  | "small"
  | "baseSmall"
  | "base"
  | "baseLarge"
  | "large"
  | "extraLarge"
  | "metaSmall"
  | "metaMedium"
  | "metaLarge"
  | "displaySmall"
  | "displayLarge";

export type FontStretch = "condensed" | "semi-condensed";
export type FontWeight = "normal" | "semi-bold" | "bold";

export type Space =
  | "none"
  | "extraTight"
  | "tight"
  | "baseTight"
  | "base"
  | "baseLoose"
  | "loose"
  | "extraLoose";

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

export type DisplaySize = "small" | "large";
export type MetaSize = "small" | "medium" | "large";

export type Size = number | string;

export interface Shape {
  width?: Size;
  height?: Size;
}

export type ColorHue =
  | "white"
  | "black"
  | "placeholder"
  | "gatsbyGold"
  | "background";

export type ColorValue = number | string;

export type Color = ColorHue | [ColorHue, ColorValue];

export type FlexDistribute = "fill" | "fill-evenly";
export type FlexWrap = "nowrap" | "wrap" | "wrap-reversed";

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
