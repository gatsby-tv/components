import React from "react";

import {
  Small,
  Medium,
  Large,
  ExtraLarge,
} from "./Styles";

type HeaderTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export enum DisplayTextSize {
  Small = Small,
  Medium = Medium,
  Large = Large,
  ExtraLarge = ExtraLarge,
}

export interface DisplayTextProps {
  children?: React.Node;
  size?: DisplayTextSize;
  as?: HeaderTag;
}

export const DisplayText: React.FC<DisplayTextProps> = (props) => {
  const Container = props.size || DisplayTextSize.Medium;

  return (
    <Container as={props.as || "p"}>
      {props.children}
    </Container>
  );
};
