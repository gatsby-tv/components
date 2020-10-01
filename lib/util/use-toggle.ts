import { useState, useCallback } from "react";

export const useToggle = (initial: boolean) => {
  const [state, setState] = useState(initial);

  return {
    state,
    flipToggle: useCallback(() => setState((state) => !state), []),
    setToggle: useCallback((value: boolean) => setState(value), []),
  };
};
