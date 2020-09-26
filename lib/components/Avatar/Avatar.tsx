import React from "react";

import { Image } from "../Image";

import { Container, Fill, Content, Overlay } from "./Styles";

export enum AvatarSize {
  Small = "3.6rem",
  Medium = "4.4rem",
  Large = "6rem",
}

export interface AvatarProps {
  source: string;
  size: AvatarSize;
  overlay?: React.Node;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
  return (
    <Container size={props.size}>
      <Fill>
        <Content src={props.source} />
        {props.overlay && <Overlay>{props.overlay}</Overlay>}
      </Fill>
    </Container>
  );
};
