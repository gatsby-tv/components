import React from "react";

import { Small, Medium, Large, ExtraLarge } from "./Styles";

type HeaderTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum DisplayTextSize {
  Small,
  Medium,
  Large,
  ExtraLarge,
}

export interface DisplayTextProps {
  children?: React.ReactNode;
  size?: DisplayTextSize;
  as?: HeaderTag;
}

export const DisplayText: React.FC<DisplayTextProps> = (props) => {
  switch (props.size) {
    case DisplayTextSize.Small:
      return <Small as={props.as || "p"}>{props.children}</Small>;

    case DisplayTextSize.Medium:
      return <Medium as={props.as || "p"}>{props.children}</Medium>;

    case DisplayTextSize.Large:
      return <Large as={props.as || "p"}>{props.children}</Large>;

    case DisplayTextSize.ExtraLarge:
      return <ExtraLarge as={props.as || "p"}>{props.children}</ExtraLarge>;

    default:
      return <Small as={props.as || "p"}>{props.children}</Small>;
  }
};
