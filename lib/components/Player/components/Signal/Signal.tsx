import styled from "styled-components";

import { Circle, CircleProps } from "@lib/components/Circle";

export type SignalProps = CircleProps;

export const Signal = styled(Circle)<SignalProps>`
  opacity: 0;

  @keyframes enter {
    0% {
      opacity: 0.1;
      transform: scale(0.6);
    }

    30% {
      opacity: 0.5;
    }

    100% {
      opacity: 0;
      transform: scale(1);
    }
  }

  animation-name: enter;
  animation-duration: 700ms;
  animation-fill-direction: forwards;
`;
