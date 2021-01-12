import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import styled, { css } from "styled-components";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { Size, Margin, FontSize } from "@lib/types";
import { cssSize, cssMargin } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";
import { cssTextButton } from "@lib/styles/typography";

export type ButtonProps = {
  animate?: boolean;
  rounded?: Size;
  padding?: Margin;
  bg?: string;
  fg?: string;
  highlight?: string | [string, string];
  font?: FontSize;
  fontHeight?: FontSize;
  onClick?: () => void;
} & React.ButtonHTMLAttributes<HTMLElement>;

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

const cssPadding = (padding?: Margin, rounded?: Size) => css`
  ${(props) =>
    cssMargin(
      "padding",
      padding,
      rounded === props.theme.border.radius.full
        ? props.theme.spacing.baseTight
        : [props.theme.spacing.tight, props.theme.spacing.baseTight]
    )}
`;

const ButtonBase = styled.button<ButtonProps>`
  ${cssTextButton}
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  display: block;
  position: relative;
  outline: none;
  ${(props) =>
    cssProperty("font-size", props.theme.font.size[props.font ?? "baseSmall"])}
  ${(props) =>
    cssProperty(
      "line-height",
      ifExists(
        props.fontHeight,
        props.theme.font.height[props.fontHeight as FontSize]
      ),
      props.theme.font.height[props.font ?? "base"]
    )}
  ${(props) => cssProperty("background-color", props.bg, "transparent")}
  ${(props) =>
    cssProperty("color", props.fg, props.theme.colors.font.body.darken(0.1))}
  ${(props) =>
    cssSize("border-radius", props.rounded, props.theme.border.radius.small)}
  ${(props) => cssPadding(props.padding, props.rounded)}
  ${(props) =>
    ifExists(
      props.highlight,
      cssHighlight([props.highlight].flat(), props.animate)
    )}
  ${(props) =>
    ifExists(
      props.animate,
      cssAnimate([props.highlight].flat(), props.rounded)
    )}
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: ButtonProps, ref: React.Ref<HTMLButtonElement>) => {
    const key = useRef(0);
    const [active, setActive] = useState(0);
    const [held, setHeld] = useState(false);
    const { onClick = () => undefined, ...rest } = props;

    useEffect(() => {
      if (active) {
        const id = setTimeout(() => setActive(0), 200);
        return () => clearTimeout(id);
      }
    }, [active]);

    /*
     * The reason that we don't just pass onClick to the component
     * like all of the other event handlers is due to a pretty interesting
     * edge case.
     *
     * Since React insists that it handles all events itself, the onClick
     * handler will not fire if we force React to remount the button on
     * the onPointerDown event. When the onPointerDown event fires, the
     * first stage of an onClick event initiates for our button, however,
     * we also simultaneously force React to remount the button by
     * changing the button's key. Thus, the button that saw the initiation
     * of the onClick event is no longer the same button that sees the
     * onClick event's conclusion when the mouse is released --- preventing
     * the onClick handler from ever firing.
     */
    useEffect(() => {
      key.current && !held && onClick();
    }, [held]);

    const handlePointerDown = useCallback(
      (event: React.SyntheticEvent) => {
        if (props.animate) {
          key.current++;
          setHeld(true);
          setActive((current) => current + 1);
        }

        event.stopPropagation();
      },
      [props.animate]
    );

    const handlePointerUp = useCallback(() => props.animate && setHeld(false), [
      props.animate,
    ]);

    return (
      <ButtonBase
        ref={ref}
        key={key.current}
        data-animating={ifExists(props.animate && (active || held))}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={ifNotExists(props.animate, onClick)}
        {...rest}
      />
    );
  }
);
