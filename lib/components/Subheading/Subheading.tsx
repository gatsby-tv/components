import styled from "styled-components";

import { cssTextSubheading } from "@lib/styles";
import { Heading } from "@lib/components";

export interface SubheadingProps {}

export const Subheading = styled.h3<SubheadingProps>`
  ${cssTextSubheading}

  ${Heading} + & {
    margin-top: ${(props) => props.theme.spacing.extraTight};
  }
`;
