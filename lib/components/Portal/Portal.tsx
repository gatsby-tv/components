import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { useUniqueId } from "@lib/utilities";

export interface PortalProps {
  children?: React.ReactNode;
  id?: string;
  onMount?: () => void;
}

export const Portal: React.FC<PortalProps> = (props) => {
  const id = useUniqueId("portal");
  const portal = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const { onMount = () => undefined } = props;
    const fullId = props.id ? `${props.id}-${id}` : `${id}`;

    portal.current = document.createElement("div");
    portal.current.setAttribute("data-portal-id", fullId);
    document.body.appendChild(portal.current);
    setMounted(true)
    onMount();

    return () => {
      document.body.removeChild(portal.current as HTMLElement);
    };
  }, []);

  return (
    (portal?.current &&
      mounted &&
      createPortal(props.children, portal.current)) ||
    null
  );
};
