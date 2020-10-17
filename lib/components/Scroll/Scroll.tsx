import styled from "styled-components";

import { ifExists, ifNotExists } from "@lib/utilities";
import { cssProperty } from "@lib/styles";

export interface ScrollProps {
  $hidden?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
}

export const Scroll = styled.div<ScrollProps>`
  height: 100%;
  ${(props) => cssProperty("overflow-y", ifExists(props.vertical, "auto"))}
  ${(props) => cssProperty("overflow-x", ifExists(props.horizontal, "auto"))}
  ${(props) => cssProperty("padding-right", ifNotExists(props.$hidden, "1rem"))}
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    width: ${(props) => (props.$hidden ? "0" : "1rem")};
    height: ${(props) => (props.$hidden ? "0" : "1rem")};
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) =>
      props.$hidden ? "transparent" : props.theme.colors.background[3]};
    border-radius: 2rem;
    transition: all 100ms ease;
  }
`;
