import React from "react";
import styled from "styled-components";

import { TextBox } from "@app/components";
import { cssTextCaption } from "@app/styles";

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
