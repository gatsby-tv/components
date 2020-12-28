import { css } from "styled-components";

import { Size } from "@lib/types";

const parseSize = (size: Size) => {
  if (typeof size === "number") {
    return `${100 * size}%`;
  } else {
    return size;
  }
};

export const cssSize = (property: string, size?: Size, defaultValue?: Size) => {
  if (size == null) {
    return defaultValue != null
      ? css`
          ${property}: ${parseSize(defaultValue)};
        `
      : css``;
  }

  return css`
    ${property}: ${parseSize(size)};
  `;
};
