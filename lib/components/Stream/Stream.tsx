import React, { useState, useEffect, useReducer } from "react";
import { Spinner } from "@gatsby-tv/icons";

import { Flex, Icon } from "@lib/components";
import { EventHandler, Size } from "@lib/types";
import { useScroll, useTheme } from "@lib/utilities";

interface FetchAction {
  type: "fetch";
}

interface SyncAction<T> {
  type: "sync";
  items: T[];
}

type StreamAction<T> = FetchAction | SyncAction<T>;

type StreamState<T> = {
  index: number;
  loading: boolean;
  items: T[];
};

export interface StreamProps<T> {
  source: React.FC<T>;
  generator: (index: number) => T | T[];
  gap?: Size;
}

export function Stream<T>(props: StreamProps<T>) {
  const { source: SourceComponent, generator, gap } = props;
  const theme = useTheme();
  const [waiting, setWaiting] = useState(false);
  const addScrollListener = useScroll();

  const [state, dispatch] = useReducer(
    (state: StreamState<T>, action: StreamAction<T>) => {
      switch (action.type) {
        case "fetch":
          return state.loading
            ? state
            : { ...state, index: state.index + 1 || 0, loading: true };

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
    async function fetchItems() {
      const items = [await generator(state.index)].flat() as T[];
      dispatch({ type: "sync", items });
    }

    fetchItems();
  }, [state.index]);

  useEffect(() => {
    if (state.loading) {
      const id = setTimeout(() => setWaiting(true), 100);
      return () => clearTimeout(id);
    } else {
      setWaiting(false);
    }
  }, [state.loading]);

  useEffect(() => {
    const handleScroll: EventHandler = (event) => {
      const target = event.currentTarget;
      if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        dispatch({ type: "fetch" });
      }
    };

    addScrollListener(handleScroll);
    dispatch({ type: "fetch" });
  }, []);

  const loadingMarkup = waiting ? (
    <Flex $fill center>
      <Icon $width="4.4rem" source={Spinner} />
    </Flex>
  ) : null;

  const children = state.items.map((item, index) => (
    <SourceComponent key={index} {...item} />
  ));

  return (
    <Flex column gap={gap}>
      {children}
      {loadingMarkup}
    </Flex>
  );
}
