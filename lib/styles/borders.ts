import { css } from "styled-components";

export const cssInputBorder = css`
  box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
    hsl(0, 0%, 80%);
  transition: all ${(props) => props.theme.duration.faster} ease;

  &:hover {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
      hsl(0, 0%, 70%);
  }

  &:focus {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.blue};
    z-index: 10;
  }

  &[data-error] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.error.fade(0.4)};
    z-index: 10;
  }
`;
