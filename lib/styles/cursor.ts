import { css } from "styled-components";

import { ifExists } from "@lib/utilities/if-exists";
import { cssProperty } from "@lib/styles/property";

export const cssCursorVisibility = (hidden?: boolean) => css`
  &,
  & * {
    ${cssProperty("cursor", ifExists(hidden, "none !important"))}
  }
`;
