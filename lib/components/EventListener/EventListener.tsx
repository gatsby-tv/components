import React, { useEffect } from "react";

import { EventHandler } from "@app/types";

export type EventListenerProps = {
  for?: React.RefObject<HTMLElement>;
} & EventHandler;

export const EventListener: React.FC<EventListenerProps> = (props) => {
  useEffect(() => {
    if (!props.for) {
      window.addEventListener(
        props.event,
        props.handler,
        props.capture ?? false
      );
      return () =>
        window.removeEventListener(
          props.event,
          props.handler,
          props.capture ?? false
        );
    } else {
      props.for?.current?.addEventListener(
        props.event,
        props.handler,
        props.capture ?? false
      );
      return () =>
        props.for?.current?.removeEventListener(
          props.event,
          props.handler,
          props.capture ?? false
        );
    }
  });

  return null;
};
