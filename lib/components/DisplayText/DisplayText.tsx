import React from "react";

import { Container } from "./Styles";

type HeaderTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum DisplayTextSize {
  Small = "var(--display-text-size-small)",
  Medium = "var(--display-text-size-medium)",
  Large = "var(--display-text-size-large)",
  ExtraLarge = "var(--display-text-size-x-large)",
}

export interface DisplayTextProps {
  children?: React.Node;
  size?: DisplayTextSize;
  as?: HeaderTag;
}

export const DisplayText: React.FC<DisplayTextProps> = (props) => (
  <Container
    as={props.as || "p"}
    size={props.size || DisplayTextSizeType.Medium}
  >
    {props.children}
  </Container>
);
