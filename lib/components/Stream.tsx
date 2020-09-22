import React, { useReducer, useEffect, useContext } from "react";
import styled from "styled-components";

import { ScrollContext } from "./Scroll";

import "../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-scroll",
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;

interface FetchAction {
  type: "fetch";
}

interface SyncAction {
  type: "sync";
  items: React.Node[];
}

type StreamAction = FetchAction | SyncAction;

type StreamProps = {
  generator: (index: number) => React.Node | React.Node[];
};

const Stream: React.FC<StreamProps> = (props) => {
  const addCallback = useContext(ScrollContext);

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "fetch":
          return { ...state, index: state.index + 1 || 0, loading: true };

        case "sync":
          return {
            ...state,
            items: [...state.items, ...action.items],
            loading: false,
          };

        default:
          return state;
      }
    },
    { index: NaN, items: [], loading: false }
  );

  useEffect(() => {
    const next = [props.generator(state.index)].flat();
    setState({ type: "sync", items: next });
  }, [state.index]);

  useEffect(() => {
    const handleScroll = (event) => {
      const target = event.target;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        setState({ type: "fetch" });
      }
    };

    addCallback(handleScroll);
    setState({ type: "fetch" });
  }, []);

  return <Container>{state.items}</Container>;
};

export { StreamProps };
export default Stream;
