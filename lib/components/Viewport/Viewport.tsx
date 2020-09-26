import React, { createContext, useState, useEffect, useRef } from "react";

import { Container, Fill, Content, Overlay } from "./Styles";

export const ViewportContext = createContext([null, null, [], () => null]);

export interface ViewportCallback {
  type: string;
  callback(): void;
}

export interface ViewportProps {
  children?: React.Node;
  aspectRatio?: number;
  overlay?: React.Node;
}

export const Viewport: React.FC<ViewportProps> = (props) => {
  const video = useRef(null);
  const container = useRef(null);
  const [callbacks, setCallbacks] = useState([]);

  return (
    <Container ref={container} aspectRatio={props.aspectRatio || 9 / 16}>
      <Fill>
        <ViewportContext.Provider
          value={[container, video, callbacks, setCallbacks]}
        >
          <Content>{props.children}</Content>
          {props.overlay && <Overlay>{props.overlay}</Overlay>}
        </ViewportContext.Provider>
      </Fill>
    </Container>
  );
};
