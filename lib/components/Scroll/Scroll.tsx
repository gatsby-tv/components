import React, { createContext, useState } from "react";

import { Container, HiddenContainer } from "./Styles";

interface ScrollCallback {
  (event: React.UIEvent): void;
}

interface ScrollContextType {
  (callback: ScrollCallback): void;
}

export const ScrollContext = createContext<ScrollContextType>(() => undefined);

export interface ScrollProps {
  children?: React.ReactNode;
  hidden?: boolean;
}

export const Scroll: React.FC<ScrollProps> = (props) => {
  const [callbacks, setCallbacks] = useState<ScrollCallback[]>([]);

  const addCallback = (callback: ScrollCallback) =>
    setCallbacks((current) => [...current, callback]);

  const handleScroll = (event: React.UIEvent) =>
    callbacks.forEach((callback) => callback(event));

  return props.hidden ? (
    <HiddenContainer onScroll={handleScroll}>
      <ScrollContext.Provider value={addCallback}>
        {props.children}
      </ScrollContext.Provider>
    </HiddenContainer>
  ) : (
    <Container onScroll={handleScroll}>
      <ScrollContext.Provider value={addCallback}>
        {props.children}
      </ScrollContext.Provider>
    </Container>
  );
};
