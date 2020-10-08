import styled from "styled-components";

import { DisplaySize } from "@app/types";
import { cssTextDisplay } from "@app/styles";

export interface TextDisplayProps {
  size?: DisplaySize;
}

export const TextDisplay = styled.h1<TextDisplayProps>`
  ${(props) => cssTextDisplay(props.size ?? "small")}
`;
