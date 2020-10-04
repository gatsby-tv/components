import styled from "styled-components";

import { cssTextBody } from "@app/styles";
import { Space } from "@app/types";

export interface TextBoxProps {
  spacing?: Space,
}

export const TextBox = styled.div<TextBoxProps>`
  ${cssTextBody}

  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[props.spacing ?? "base"]};
  }
`
