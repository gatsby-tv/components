import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { useUniqueIdGenerator } from "@app/utilities";

export interface PortalProps {
  children?: React.ReactNode;
  portalId?: string;
  onMount?: () => void;
}

export const Portal: React.FC<PortalProps> = (props) => {
  const getUniqueId = useUniqueIdGenerator("portal");
  const portal = useRef<HTMLElement | null>(null);
  const mounted = useRef(false);

  useEffect(() => {
    const { onMount = () => undefined } = props;
    const id = props.portalId
      ? `${props.portalId}-${getUniqueId()}`
      : `${getUniqueId()}`;

    portal.current = document.createElement("div");
    portal.current.setAttribute("data-portal-id", id);
    document.body.appendChild(portal.current);
    mounted.current = true;
    onMount();

    return () => {
      document.body.removeChild(portal.current as HTMLElement);
    };
  }, []);

  return (
    (portal?.current &&
      mounted.current &&
      createPortal(props.children, portal.current)) ||
    null
  );
};
