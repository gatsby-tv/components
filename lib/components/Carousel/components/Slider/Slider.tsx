import React, { CSSProperties } from "react";
import { useTheme } from "@gatsby-tv/utilities";

import { Flex } from "@lib/components";

export type SliderState = {
  current: number;
  desired: number;
};

export type SliderAction = { type: "jump"; desired: number } | { type: "sync" };

export interface SliderProps {
  children?: React.ReactNode;
  state: SliderState;
  groups: number;
}

export function Slider(props: SliderProps): React.ReactElement {
  const theme = useTheme();
  const distance = props.state.current - props.state.desired;

  const style: CSSProperties = {
    width: `${100 * (props.groups + 2)}%`,
    left: `${-100 * (props.state.current + 1)}%`,
    transform: "translateX(0)",
    transition: "none",
  };

  if (distance) {
    const direction =
      Math.sign(distance) * (Math.abs(distance) <= props.groups / 2 ? 1 : -1);

    const shift = (direction * 100) / (props.groups + 2);
    style.transform = `translateX(${shift}%)`;
    style.transition = `transform ${theme.duration.base} ease`;
  }

  return (
    <Flex css={{ willChange: "left, transform" }} style={style} align="center">
      {props.children}
    </Flex>
  );
}
