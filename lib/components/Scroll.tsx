import React, { createContext, useState } from "react";
import styled from "styled-components";

import "../config/styles.css";

const Container = styled.div`
  overflow-y: auto;
  height: 100%;
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dark-grey-2);
    border-radius: 2rem;

    transition: all 100ms ease;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--dark-grey-3);
  }
`;

const HiddenContainer = styled(Container)`
  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: none;
  }
`;

const ScrollContext = createContext(() => false);

type ScrollProps = {
  hidden: boolean;
  children: React.Node;
};

const Scroll: React.FC<ScrollProps> = (props) => {
  const [callbacks, setCallbacks] = useState([]);

  const addCallback = (callback) =>
    setCallbacks((current) => [...current, callback]);

  const handleScroll = (event) =>
    callbacks.forEach((callback) => callback(event));

  return props.hidden ? (
    <HiddenContainer className="gz-scroll" onScroll={handleScroll}>
      <ScrollContext.Provider value={addCallback}>
        {props.children}
      </ScrollContext.Provider>
    </HiddenContainer>
  ) : (
    <Container className="gz-scroll" onScroll={handleScroll}>
      <ScrollContext.Provider value={addCallback}>
        {props.children}
      </ScrollContext.Provider>
    </Container>
  );
};

export { ScrollProps, ScrollContext };
export default Scroll;
