import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";
import { cssTextButton } from "@lib/styles/typography";

const cssHighlight = (
  highlight: (string | undefined)[],
  animated?: boolean
) => css`
  &:hover,
  &:active {
    ${(props) =>
      cssProperty(
        "background-color",
        animated ? ifExists(highlight[1], highlight[0]) : highlight[0]
      )}
  }

  &:active {
    ${(props) =>
      cssProperty("background-color", ifNotExists(animated, highlight[1]))}
  }
`;

const cssAnimate = (highlight: (string | undefined)[], rounded?: Size) => css`
  &:before {
    content: "";
    pointer-events: none;
    backface-visibility: hidden;
    ${(props) =>
      cssSize("border-radius", rounded, props.theme.border.radius.small)}
    ${(props) =>
      cssProperty(
        "background-color",
        highlight[1] ?? highlight[0],
        props.theme.colors.font.body
      )}
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    transition: all ${(props) => props.theme.duration.faster} ease;
  }

  &[data-animating]:before {
    opacity: 0.2;
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

const cssPadding = (padding?: Size, rounded?: Size) => css`
  ${(props) =>
    cssSize(
      "padding",
      padding,
      rounded === props.theme.border.radius.full
        ? props.theme.spacing.baseTight
        : `${props.theme.spacing.tight} ${props.theme.spacing.baseTight}`
    )};
`;

export type ButtonProps = {
  $animate?: boolean;
  $rounded?: Size;
  $padding?: Size;
  $bg?: string;
  $fg?: string;
  $highlight?: string | [string, string];
} & React.ButtonHTMLAttributes<HTMLElement>;

const ButtonBase = styled.button<ButtonProps>`
  ${cssTextButton}
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  display: block;
  position: relative;
  outline: none;
  ${(props) => cssProperty("background-color", props.$bg, "transparent")}
  ${(props) => cssProperty("color", props.$fg)}
  ${(props) =>
    cssSize("border-radius", props.$rounded, props.theme.border.radius.small)}
  ${(props) => cssPadding(props.$padding, props.$rounded)}
  ${(props) =>
    ifExists(
      props.$highlight,
      cssHighlight([props.$highlight].flat(), props.$animate)
    )}
  ${(props) =>
    ifExists(
      props.$animate,
      cssAnimate([props.$highlight].flat(), props.$rounded)
    )}
`;

export function Button(props: ButtonProps): React.ReactElement {
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
      data-animating={ifExists(props.$animate && (active || held))}
      onPointerDown={ifExists(props.$animate, handlePointerDown)}
      onPointerUp={ifExists(props.$animate, handlePointerUp)}
      onPointerLeave={ifExists(props.$animate, handlePointerUp)}
      {...props}
    />
  );
}
