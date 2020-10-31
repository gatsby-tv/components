import styled from "styled-components";

import { cssTextHeading } from "@lib/styles/typography";

export interface TextHeadingProps {}

export const TextHeading = styled.h2<TextHeadingProps>`
  ${cssTextHeading}
`;
