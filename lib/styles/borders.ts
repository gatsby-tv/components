import { css } from "styled-components";

export const cssInputBorder = css`
  box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
    ${(props) => props.theme.colors.background[5].lighten(0.5)};
  transition: all ${(props) => props.theme.duration.faster} ease;

  &:hover {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
      ${(props) => props.theme.colors.background[5].lighten(0.7)};
  }

  &:focus,
  &[data-focus] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
      ${(props) => props.theme.colors.blue};
    z-index: 10;
  }

  &[data-error] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
      ${(props) => props.theme.colors.error.fade(0.4)};
    z-index: 10;
  }

  &[data-error]:hover {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
      ${(props) => props.theme.colors.error.fade(0.2)};
  }

  &[data-error]:focus,
  &[data-error][data-focus] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.smallest}
      ${(props) => props.theme.colors.error.fade(0.2)};
  }
`;
