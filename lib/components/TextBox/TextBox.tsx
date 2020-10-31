import styled from "styled-components";

import { Space } from "@lib/types";
import { cssTextBody } from "@lib/styles/typography";
import { Box, BoxProps } from "@lib/components/Box";

export interface TextBoxProps extends BoxProps {
  $spacing?: Space;
}

export const TextBox = styled(Box)<TextBoxProps>`
  ${cssTextBody}

  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[props.$spacing ?? "base"]};
  }
`;
