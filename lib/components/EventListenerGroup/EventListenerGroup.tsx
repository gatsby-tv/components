import React, { useEffect, useCallback } from "react";

import { EventHandler } from "@app/types";

export interface EventListenerGroupProps {
  handlers: EventHandler[];
  for?: React.RefObject<HTMLElement>;
}

export const EventListenerGroup: React.FC<EventListenerGroupProps> = (
  props
) => {
  const addHandler = useCallback(({ event, handler, capture = false }) => {
    if (!props.for) {
      window.addEventListener(event, handler, capture);
      return () => window.removeEventListener(event, handler, capture);
    } else {
      props.for?.current?.addEventListener(event, handler, capture);
      return () =>
        props.for?.current?.removeEventListener(event, handler, capture);
    }
  }, []);

  useEffect(() => {
    const cleanups = props.handlers.map((handler) => addHandler(handler));
    return () => cleanups.forEach((cleanup) => cleanup());
  });

  return null;
};
