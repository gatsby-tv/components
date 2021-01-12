import { css, CSSProp } from "styled-components";

export const cssShadow = css`
  box-shadow: 0 0 10px ${(props) => props.theme.colors.shadow.dark};
`;

export const cssShadowEmbross = (
  offset: number,
  radius: number
): CSSProp => css`
  box-shadow: -${offset}px -${offset}px ${radius}px
      ${(props) => props.theme.colors.shadow.light},
    ${offset}px ${offset}px ${radius}px
      ${(props) => props.theme.colors.shadow.dark};
`;
