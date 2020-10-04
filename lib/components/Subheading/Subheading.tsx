import styled from "styled-components";

import { cssTextSubheading } from "@app/styles";
import { Heading } from "@app/components";

export interface SubheadingProps {}

export const Subheading = styled.h3<SubheadingProps>`
  ${cssTextSubheading}

  ${Heading} + & {
    margin-top: ${props => props.theme.spacing.extraTight};
  }
`
