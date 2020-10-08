import styled from "styled-components";

import { cssTextBody } from "@app/styles";
import { Box, BoxProps } from "@app/components";
import { Space } from "@app/types";

export interface TextBoxProps extends BoxProps {
  $spacing?: Space;
}

export const TextBox = styled(Box)<TextBoxProps>`
  ${cssTextBody}

  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[props.$spacing ?? "base"]};
  }
`;
