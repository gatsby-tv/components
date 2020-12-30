import { css } from "styled-components";

export const cssShadowEmbross = (
  offset: number,
  radius: number
): CSSProp => css`
  box-shadow: -${offset}px -${offset}px ${radius}px
      ${(props) => props.theme.colors.shadow.light},
    ${offset}px ${offset}px ${radius}px
      ${(props) => props.theme.colors.shadow.dark};
`;
