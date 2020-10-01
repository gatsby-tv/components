import { css } from "styled-components";

import { spacing } from "../spacing";
import { Space } from "../../types";

export const cssDistribute = (space: Space) => css`
  > *:not(:first-child) {
    margin-top: ${spacing[space]};
  }
`;
