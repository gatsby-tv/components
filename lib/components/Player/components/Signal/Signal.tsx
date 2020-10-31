import styled from "styled-components";

import { Circle, CircleProps } from "@lib/components/Circle";

export type SignalProps = CircleProps;

export const Signal = styled(Circle)<SignalProps>`
  opacity: 0;

  @keyframes enter {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }

    40% {
      opacity: 0.6;
      transform: scale(1);
    }

    100% {
      opacity: 0;
      transform: scale(1.2);
    }
  }

  animation-name: enter;
  animation-duration: 700ms;
  animation-fill-direction: forwards;
`;
