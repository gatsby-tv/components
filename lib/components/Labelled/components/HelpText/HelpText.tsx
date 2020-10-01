import styled from "styled-components";

import { spacing } from "@app/styles/spacing";
import {
  cssTextBreakWord,
  cssTextSubdued,
  cssTextBody,
} from "@app/styles/mixins";
import { Box, BoxProps } from "@app/components";

export type HelpTextProps = BoxProps;

export const HelpText = styled(Box)<HelpTextProps>`
  ${cssTextBreakWord}
  ${cssTextSubdued}
  ${cssTextBody}
  margin-top: ${spacing.extraTight};
`;
