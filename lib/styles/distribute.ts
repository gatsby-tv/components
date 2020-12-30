import { css, CSSProp } from "styled-components";

import { Space } from "@lib/types";

export const cssDistribute = (space: Space): CSSProp => css`
  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[space]};
  }
`;
