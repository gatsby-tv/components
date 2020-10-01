import { css } from "styled-components";

import { Size } from "../../types";
import { parseSize } from "../../util/parse-css";

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
