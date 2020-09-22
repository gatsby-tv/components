import React, { createContext, useState, useEffect, useRef } from "react";
import styled from "styled-components";

import "../config/styles.css";

const Container = styled.figure`
  position: relative;
  margin: 0;

  &:before {
    content: "";
    display: block;

    width: 100%;
    padding-top: ${(props) => 100 * props.aspectRatio}%;

    background-color: black;
  }
`;

const Fill = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Content = styled.div`
  display: block;

  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`;

const ViewportContext = createContext([null, () => null]);

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
  const [callbacks, setCallbacks] = useState([]);

  useEffect(() => {
    if (callbacks.length === 0) {
      return;
    }

    const removeAll = () =>
      callbacks.forEach((item, index) =>
        video.current.removeEventListener(item.type, item.callback)
      );

    callbacks.forEach((item, index) =>
      video.current.addEventListener(item.type, item.callback)
    );

    setCallbacks([]);
    return removeAll;
  }, [video.current, callbacks]);

  const addCallback = (type, callback) =>
    setCallbacks((current) => [...current, { type: type, callback: callback }]);

  return (
    <Container
      className="gz-viewport"
      aspectRatio={props.height / props.width || 9 / 16}
    >
      <Fill>
        <Content>
          <ViewportContext.Provider value={[video, addCallback]}>
            {props.children}
          </ViewportContext.Provider>
        </Content>
        {props.overlay && <Overlay>{props.overlay}</Overlay>}
      </Fill>
    </Container>
  );
};

export { ViewportProps, ViewportContext };
export default Viewport;
