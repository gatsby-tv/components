import styled from "styled-components";

import { cssProperty } from "@app/styles";

export interface ScrollProps {
  hidden?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
}

export const Scroll = styled.div<ScrollProps>`
  ${(props) => cssProperty("overflow-y", props.vertical ? "auto" : undefined)}
  ${(props) => cssProperty("overflow-x", props.horizontal ? "auto" : undefined)}
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    width: ${(props) => (props.hidden ? "0" : "1rem")};
    height: ${(props) => (props.hidden ? "0" : "1rem")};
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.hidden ? "transparent" : props.theme.colors.background[3]}
    border-radius: 2rem;
    transition: all 100ms ease;
  }
`;
