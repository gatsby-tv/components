import React, { useState, useEffect, useReducer, useCallback } from "react";
import { Spinner } from "@gatsby-tv/icons";
import { useTheme, useScroll } from "@gatsby-tv/utilities";

import { EventHandler, Size } from "@lib/types";
import { Flex, FlexProps } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";

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
  $source: React.FC<T>;
  $generator: (index: number) => T | T[];
}

export function Stream<T>(props: StreamProps<T> & FlexProps) {
  const { $source: SourceComponent, $generator, ...flexProps } = props;
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

  const handleScroll = useCallback((event) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      dispatch({ type: "fetch" });
    }
  }, []);

  useEffect(() => {
    async function fetchItems() {
      const items = [await $generator(state.index)].flat() as T[];
      dispatch({ type: "sync", items });
    }

    if (!isNaN(state.index)) {
      fetchItems();
    }
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
    addScrollListener(handleScroll);
    dispatch({ type: "fetch" });
  }, []);

  const loadingMarkup = waiting ? (
    <Flex $fill $center>
      <Icon $source={Spinner} $width="44px" />
    </Flex>
  ) : null;

  const children = state.items.map((item, index) => (
    <SourceComponent key={index} {...item} />
  ));

  return (
    <Flex {...flexProps}>
      {children}
      {loadingMarkup}
    </Flex>
  );
}
