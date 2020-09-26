import React from "react";

import { Container, Fill, Content, Overlay } from "./Styles";

export interface ImageProps {
  source: string;
  aspectRatio?: number;
  overlay?: React.Node;
}

export const Image: React.FC<ImageProps> = (props) => {
  return (
    <Container aspectRatio={props.aspectRatio || 1} rounded={props.rounded}>
      <Fill>
        <Content src={props.source} />
        {props.overlay && <Overlay>{props.overlay}</Overlay>}
      </Fill>
    </Container>
  );
};
