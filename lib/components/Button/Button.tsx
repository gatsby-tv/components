import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";
import { cssTextButton } from "@lib/styles/typography";
import { ifExists, ifNotExists } from "@lib/utilities/if-exists";

const cssHighlight = (circular?: boolean) => css`
  &:before {
    content: "";
    pointer-events: none;
    border-radius: ${(props) =>
      circular
        ? props.theme.border.radius.full
        : props.theme.border.radius.small};
    background-color: ${(props) => props.theme.colors.font.body};
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: all ${(props) => props.theme.duration.faster} ease;
  }

  &[data-animating]:before {
    opacity: 0.1;
    animation-name: highlight;
    animation-duration: ${(props) => props.theme.duration.faster};
    animation-timing-function: cubic-bezier(0.2, 1, 0.6, 1);
  }

  @keyframes highlight {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
`;

const cssPadding = (padding?: Size, circular?: boolean) => css`
  ${(props) =>
    cssSize(
      "padding",
      padding,
      circular
        ? props.theme.spacing.baseTight
        : `${props.theme.spacing.tight} ${props.theme.spacing.baseTight}`
    )};
`;

export type ButtonProps = {
  circular?: boolean;
  nohighlight?: boolean;
  padding?: Size;
} & React.ButtonHTMLAttributes<HTMLElement>;

const ButtonBase = styled.button<ButtonProps>`
  ${cssTextButton}
  background-color: transparent;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  display: block;
  position: relative;
  outline: none;
  ${(props) =>
    ifNotExists(props.nohighlight, cssPadding(props.padding, props.circular))}
  ${(props) => ifNotExists(props.nohighlight, cssHighlight(props.circular))}
`;

export function Button(props: ButtonProps) {
  const key = useRef(0);
  const [active, setActive] = useState(false);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (active) {
      setTimeout(() => setActive(false), 200);
    }
  }, [active]);

  const handlePointerDown = useCallback(() => {
    key.current++;
    setHeld(true);
    setActive(true);
  }, []);

  const handlePointerUp = useCallback(() => setHeld(false), []);

  return (
    <ButtonBase
      key={key.current}
      data-animating={ifExists(active || held)}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...props}
    />
  );
}
