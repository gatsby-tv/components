import React from "react";
import styled from "styled-components";

import "../config/styles.css";

const Container = styled.div`
  position: relative;

  &:before {
    content: "";
    display: block;

    width: 100%;
    padding-top: ${(props) => 100 * props.aspectRatio}%;
    border-radius: ${(props) => props.radius};

    background-color: var(--placeholder-color);
  }
`;

const Fill = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Content = styled.img`
  display: block;

  width: 100%;
  border-radius: ${(props) => props.radius};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
  border-radius: ${(props) => props.radius};
`;

type ImageProps = {
  src: string;
  width: number;
  height: number;
  radius: string;
  overlay: React.Node | null;
};

const Image: React.FC<ImageProps> = (props) => {
  return (
    <Container
      aspectRatio={props.height / props.width || 1}
      radius={props.radius}
    >
      <Fill>
        <Content src={props.src} radius={props.radius} />
        {props.overlay && (
          <Overlay radius={props.radius}>{props.overlay}</Overlay>
        )}
      </Fill>
    </Container>
  );
};

export { ImageProps };
export default Image;
