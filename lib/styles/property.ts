import { css } from "styled-components";

export const cssProperty = (
  property: string,
  value?: string,
  defaultValue?: string
) => {
  if (!value) {
    return defaultValue != null
      ? css`
          ${property}: ${defaultValue};
        `
      : css``;
  }

  return css`
    ${property}: ${value};
  `;
};
