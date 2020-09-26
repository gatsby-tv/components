import React from "react";

import * from "./Styles";

export interface SliderProps {
  children?: React.Node;
  desired: number;
  current: number;
  length: number;
  duration: number;
};

export const Slider: React.FC<SliderProps> = (props) => {
  const style = {
    transform: "translateX(0)",
    transition: "none",
  };

  if (props.current !== props.desired) {
    const distance = props.current - props.desired;
    const direction =
      Math.sign(distance) * (Math.abs(distance) <= props.length / 2 ? 1 : -1);

    const shift = (100 * direction) / (props.length + 2);
    style.transform = `translateX(${shift}%)`;
    style.transition = `transform ${props.duration}ms ease`;
  }

  return (
    <Container {...style, ...props}>
      {children}
    </Container>
  );
};
