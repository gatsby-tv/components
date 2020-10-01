import { css, DefaultTheme } from "styled-components";

import { Color } from "../../types";

export const cssColor = (
  property: string,
  theme: DefaultTheme,
  color: Color | undefined
) => {
  if (color == null) {
    return css``;
  }

  const parsedColor = Array.isArray(color) ? color : [color, "base"];
  const value = theme.colors[parsedColor[0]][parsedColor[1]] ?? "unset";

  return css`
    ${property}: ${value};
  `;
};
