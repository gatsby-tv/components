import React, { createContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";

import "../config/styles.css";

const Container = styled.figure.attrs((props) => ({
  className: "gz-viewport",
  style: {
    paddingTop: `${100 * props.aspectRatio}%`,
  },
}))`
  position: relative;
  margin: 0;
  width: 100%;

  background-color: black;
`;

const Fill = styled.div.attrs((props) => ({
  className: "gz-viewport-fill",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Content = styled.div.attrs((props) => ({
  className: "gz-viewport-content",
}))`
  display: block;

  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 0;
`;

const Overlay = styled.div.attrs((props) => ({
  className: "gz-viewport-overlay",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`;

const ViewportContext = createContext([null, null, [], () => null]);

type ViewportCallback = {
  type: string;
  callback: () => any;
};

type ViewportProps = {
  children: React.Node;
  width: number;
  height: number;
  overlay: React.Node | null;
};

const Viewport: React.FC<ViewportProps> = (props) => {
  const video = useRef(null);
  const container = useRef(null);
  const [callbacks, setCallbacks] = useState([]);

  return (
    <Container
      ref={container}
      aspectRatio={props.height / props.width || 9 / 16}
    >
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

export { ViewportProps, ViewportContext };
export default Viewport;
