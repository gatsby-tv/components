import React, { useEffect } from "react";

import { EventHandler } from "@lib/types";

export type EventListenerProps = EventHandler;

export const EventListener: React.FC<EventListenerProps> = (props) => {
  useEffect(() => {
    window.addEventListener(props.event, props.handler, props.capture ?? false);
    return () =>
      window.removeEventListener(
        props.event,
        props.handler,
        props.capture ?? false
      );
  });

  return null;
};
