import React, { useCallback } from "react";
import { css } from "styled-components";
import { ifExists, useModal } from "@gatsby-tv/utilities";

import { EventHandler } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Card } from "@lib/components/Card";
import { Flex } from "@lib/components/Flex";
import { Optional } from "@lib/components/Optional";
import { Portal } from "@lib/components/Portal";
import { EventListener } from "@lib/components/EventListener";

import { Overlay } from "./components";

export interface ModalProps {
  id?: string;
  children?: React.ReactNode;
  fullscreen?: boolean;
  active?: boolean;
  onExit?: () => void;
}

export function Modal(props: ModalProps): React.ReactElement | null {
  useModal(() => props.onExit && props.onExit(), [props.onExit]);

  const handleKeydown: EventHandler = useCallback((event) => {
    if ((event as any).code === "Escape") {
      props.onExit && props.onExit();
    }
  }, []);

  return props.active ? (
    <Portal id={props.id ? `modal-${props.id}` : "modal"}>
      <Optional active={ifExists(props.fullscreen)} component={Overlay}>
        <Box onPointerDown={(event) => event.stopPropagation()}>
          {props.children}
        </Box>
      </Optional>
      <EventListener event="keydown" handler={handleKeydown} />
    </Portal>
  ) : null;
}
