import React, { createContext, useState, useEffect, useRef } from "react";

import { Container, Fill, Content, Overlay } from "./Styles";

export interface ViewportCallback {
  type: string;
  callback: (event: React.SyntheticEvent) => void;
}

export interface ViewportContextType {
  viewport: React.RefObject<HTMLElement> | null;
  video: React.RefObject<HTMLVideoElement> | null;
  callbacks: ViewportCallback[];
  callbackProvider: (callbacks: ViewportCallback[]) => void;
}

export const ViewportContext = createContext<ViewportContextType>({
  viewport: null,
  video: null,
  callbacks: [],
  callbackProvider: () => undefined,
});

export interface ViewportProps {
  children?: React.ReactNode;
  aspectRatio?: number;
  overlay?: React.ReactNode;
}

export const Viewport: React.FC<ViewportProps> = (props) => {
  const video = useRef(null);
  const container = useRef(null);
  const [callbacks, setCallbacks] = useState<ViewportCallback[]>([]);

  return (
    <Container ref={container} aspectRatio={props.aspectRatio || 9 / 16}>
      <Fill>
        <ViewportContext.Provider
          value={{
            viewport: container,
            video: video,
            callbacks: callbacks,
            callbackProvider: setCallbacks,
          }}
        >
          <Content>{props.children}</Content>
          {props.overlay && <Overlay>{props.overlay}</Overlay>}
        </ViewportContext.Provider>
      </Fill>
    </Container>
  );
};
