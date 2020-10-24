import React, { useEffect } from "react";

import { EventHandler } from "@lib/types";

export interface EventListenerProps {
  event: string;
  handler: EventHandler;
  capture?: boolean;
}

export function EventListener(props: EventListenerProps) {
  useEffect(() => {
    window.addEventListener(
      props.event as any,
      props.handler,
      props.capture ?? false
    );
    return () =>
      window.removeEventListener(
        props.event as any,
        props.handler,
        props.capture ?? false
      );
  });

  return null;
}
