import React from "react";
import styled from "styled-components";

import { cssTextCaption } from "@app/styles";

export interface CaptionProps {
  children?: React.ReactNode;
}

export const Caption = styled.p<CaptionProps>`
  margin: 0;
  ${cssTextCaption}
`
