import styled from "styled-components";

import { spacing } from "@app/styles/spacing";
import {
  cssTextBreakWord,
  cssTextLabel,
  cssVisuallyHidden,
} from "@app/styles/mixins";
import { Box, BoxProps } from "@app/components";

export interface LabelTextProps extends BoxProps {
  hidden?: boolean;
}

export const LabelText = styled(Box)<LabelTextProps>`
  ${cssTextBreakWord}
  ${cssTextLabel}
  ${(props) => (props.hidden ? cssVisuallyHidden : "")}
  margin-bottom: ${spacing.extraTight};
`;
