import React, { useReducer, useEffect, useContext } from "react";

import { ScrollContext } from "../Scroll";

import { Container } from "./Styles";

interface FetchAction {
  type: "fetch";
}

interface SyncAction {
  type: "sync";
  items: React.ReactNode[];
}

type StreamAction = FetchAction | SyncAction;

interface StreamState {
  index: number;
  items: React.ReactNode[];
  loading: boolean;
}

export interface StreamProps {
  generator: (index: number) => React.ReactNode | React.ReactNode[];
}

export const Stream: React.FC<StreamProps> = (props) => {
  const addCallback = useContext(ScrollContext);

  const [state, setState] = useReducer(
    (state: StreamState, action: StreamAction) => {
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
    const handleScroll = (event: React.UIEvent) => {
      const target = event.target as HTMLElement;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        setState({ type: "fetch" });
      }
    };

    addCallback(handleScroll);
    setState({ type: "fetch" });
  }, []);

  return <Container>{state.items}</Container>;
};
