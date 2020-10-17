import styled from "styled-components";

import { cssTextHeading } from "@lib/styles";

export interface HeadingProps {}

export const Heading = styled.h2<HeadingProps>`
  ${cssTextHeading}
`;
