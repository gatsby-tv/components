import { css } from "styled-components";

export const cssInputBorder = css`
  box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
    ${(props) => props.theme.colors.background[4]};
  transition: all ${(props) => props.theme.duration.faster} ease;

  &:hover {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.background[5].lighten(0.2)};
  }

  &:focus,
  &[data-focus] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.inverted[4].fade(0.2)};
    z-index: 10;
  }

  &[data-error] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.error.fade(0.4)};
    z-index: 10;
  }

  &[data-error]:hover {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.error.fade(0.2)};
  }

  &[data-error]:focus,
  &[data-error][data-focus] {
    box-shadow: inset 0 0 0 ${(props) => props.theme.border.width.small}
      ${(props) => props.theme.colors.error.fade(0.2)};
  }
`;
