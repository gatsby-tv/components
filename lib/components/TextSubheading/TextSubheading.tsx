import styled from "styled-components";

import { cssTextSubheading } from "@lib/styles/typography";
import { TextHeading } from "@lib/components/TextHeading";

export interface TextSubheadingProps {}

export const TextSubheading = styled.h3<TextSubheadingProps>`
  ${cssTextSubheading}

  ${TextHeading} + & {
    margin-top: ${(props) => props.theme.spacing.extraTight};
  }
`;
