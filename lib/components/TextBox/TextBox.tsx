import styled from "styled-components";

import { cssTextBody } from "@lib/styles";
import { Box, BoxProps } from "@lib/components";
import { Space } from "@lib/types";

export interface TextBoxProps extends BoxProps {
  $spacing?: Space;
}

export const TextBox = styled(Box)<TextBoxProps>`
  ${cssTextBody}

  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[props.$spacing ?? "base"]};
  }
`;
