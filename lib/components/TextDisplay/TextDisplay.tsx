import styled from "styled-components";

import { DisplaySize } from "@lib/types";
import { cssTextDisplay } from "@lib/styles/typography";

export interface TextDisplayProps {
  size?: DisplaySize;
}

export const TextDisplay = styled.h1<TextDisplayProps>`
  ${(props) => cssTextDisplay(props.size ?? "small")}
`;
