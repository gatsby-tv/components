import React from "react";
import styled from "styled-components";

import { TextBox } from "@lib/components";
import { cssTextCaption } from "@lib/styles";

export interface CaptionProps {
  children?: React.ReactNode;
}

export const Caption = styled.p<CaptionProps>`
  ${cssTextCaption}
  margin: 0;

  ${TextBox} > & {
    margin-top: 0;
  }
`;
