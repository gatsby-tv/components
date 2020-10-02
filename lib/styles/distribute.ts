import { css } from "styled-components";

import { Space } from "@app/types";

export const cssDistribute = (space: Space) => css`
  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[space]};
  }
`;
