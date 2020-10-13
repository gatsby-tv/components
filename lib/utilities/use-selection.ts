import { useState, useCallback } from "react";

export const useSelection = (items: string[], initial?: string) => {
  const fresh = Object.fromEntries(items.map((id) => [id, false]));
  const [state, setState] = useState(
    initial ? { ...fresh, [initial]: true } : fresh
  );
  const select = useCallback((id?: string) => {
    if (!id) setState(fresh);
    setState({ ...fresh, [id as string]: true });
  }, []);

  return [state, select];
};
