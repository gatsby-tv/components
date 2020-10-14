import React, { useState } from "react";
import { css } from "styled-components";

import { useTheme } from "@app/utilities";
import { Card, Flex, Portal, EventListener } from "@app/components";

export interface ModalProps {
  children?: React.ReactNode;
  active?: boolean;
  onExit?: () => void;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const theme = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleClick = () => props.onExit && props.onExit();

  const style = css`
    background-color: ${(props) => props.theme.colors.black.fade(0.7)};
    backface-visibility: hidden;

    @keyframes fade {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    animation-name: fade;
    animation-duration: ${(props) => props.theme.duration.fast};
    animation-fill-mode: forwards;
    animation-timing-function: ease;

    & > ${Card} {
      @keyframes slide {
        from {
          transform: translateY(${(props) => props.theme.spacing.extraLoose});
        }

        to {
          transform: translateY(0);
        }
      }

      animation-name: slide;
      animation-duration: ${(props) => props.theme.duration.fast};
      animation-fill-mode: forwards;
      animation-timing-function: ease;
    }
  `;

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      props.onExit && props.onExit();
    }
  }

  return (
    <Portal id="modal" onMount={() => setMounted(true)}>
      {props.active && (
        <>
          <Flex absolute $fill center css={style} onClick={handleClick}>
            {props.children}
          </Flex>
          <EventListener event="keydown" handler={handleKeydown} />
        </>
      )}
    </Portal>
  );
};
