import styled from "styled-components";

import { Size } from "@lib/types";
import { cssSize } from "@lib/styles/size";
import { Box, BoxProps } from "@lib/components/Box";

export type SignalProps = { $size: Size } & BoxProps;

export const Signal = styled(Box)<SignalProps>`
  opacity: 0;
  border-radius: 100%;
  ${(props) => cssSize("width", props.$size)}
  ${(props) => cssSize("height", props.$size)}

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
