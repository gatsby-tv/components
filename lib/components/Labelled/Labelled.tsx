import React from "react";
import { css } from "styled-components";

import {
  cssTextBreakWord,
  cssTextSubdued,
  cssTextLabel,
  cssVisuallyHidden,
  cssTextBody,
} from "@app/styles";
import { Box } from "@app/components";

export interface LabelledProps {
  id: string;
  label: string;
  help?: string;
  hidden?: boolean;
  children?: React.ReactNode;
}

export const Labelled: React.FC<LabelledProps> = (props) => {
  const { id, label, help, hidden, children } = props;

  const helpStyle = css`
    margin-top: ${(props) => props.theme.spacing.extraTight};
    ${cssTextBreakWord}
    ${cssTextSubdued}
    ${cssTextBody}
  `;

  const labelStyle = css`
    margin-bottom: ${(props) => props.theme.spacing.extraTight};
    ${(props) => (hidden ? cssVisuallyHidden : "")}
    ${cssTextBreakWord}
    ${cssTextLabel}
  `;

  const helpMarkup = help ? <Box css={helpStyle}>{help}</Box> : null;

  return (
    <Box>
      <Box as="label" htmlFor={id} hidden={hidden} css={labelStyle}>
        {label}
      </Box>
      {children}
      {helpMarkup}
    </Box>
  );
};
