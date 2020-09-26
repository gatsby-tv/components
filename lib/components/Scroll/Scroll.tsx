import React, { createContext, useState } from "react";

import { Container, HiddenContainer } from "./Styles";

const ScrollContext = createContext(() => undefined);

export interface ScrollProps {
  children?: React.Node;
  hidden?: boolean;
}

export const Scroll: React.FC<ScrollProps> = (props) => {
  const [callbacks, setCallbacks] = useState([]);

  const addCallback = (callback) =>
    setCallbacks((current) => [...current, callback]);

  const handleScroll = (event) =>
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
