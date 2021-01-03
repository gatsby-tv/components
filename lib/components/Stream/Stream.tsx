import React, {
  useState,
  useEffect,
  useReducer,
  useCallback,
  useMemo,
} from "react";
import { Spinner } from "@gatsby-tv/icons";
import { useScroll, useAsync } from "@gatsby-tv/utilities";

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
  $max?: number;
}

export function Stream<T>(
  props: StreamProps<T> & FlexProps
): React.ReactElement {
  const {
    $source: SourceComponent,
    $generator,
    $max = Infinity,
    ...flexProps
  } = props;
  const [waiting, setWaiting] = useState(false);
  const addScrollListener = useScroll();

  const [state, dispatch] = useReducer(
    (state: StreamState<T>, action: StreamAction<T>) => {
      switch (action.type) {
        case "fetch":
          return state.loading || (state.index + 1 || 0) >= $max
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

  useAsync(
    async () => {
      if (isNaN(state.index)) return;
      return [await $generator(state.index)].flat() as T[];
    },
    (items) => dispatch({ type: "sync", items }),
    [$generator, state.index]
  );

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
  }, [addScrollListener, handleScroll]);

  /*
  const children = state.items.map((item, index) => (
    <SourceComponent key={index} {...item} />
  ));
  */

  const children = useMemo(
    () =>
      state.items.map((item, index) => (
        <SourceComponent key={index} {...item} />
      )),
    [state.items, SourceComponent]
  );

  const loadingMarkup = waiting ? (
    <Flex $fill $center>
      <Icon $source={Spinner} $width="44px" />
    </Flex>
  ) : null;

  return (
    <Flex {...flexProps}>
      {children}
      {loadingMarkup}
    </Flex>
  );
}
