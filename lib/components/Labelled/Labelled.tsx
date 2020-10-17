import React from "react";
import { css } from "styled-components";
import { Exclamation } from "@gatsby-tv/icons";

import {
  cssTextBreakWord,
  cssTextSubdued,
  cssTextError,
  cssTextLabel,
  cssVisuallyHidden,
  cssTextBody,
} from "@lib/styles";
import { Box, Flex, Icon } from "@lib/components";
import { useTheme } from "@lib/utilities";

export interface LabelledProps {
  id: string;
  label: string;
  help?: string;
  error?: Error;
  hidden?: boolean;
  children?: React.ReactNode;
}

export const Labelled: React.FC<LabelledProps> = (props) => {
  const { id, label, help, error, hidden, children } = props;
  const theme = useTheme();

  const helpStyle = css`
    margin-top: ${(props) => props.theme.spacing.extraTight};
    ${cssTextBreakWord}
    ${cssTextSubdued}
    ${cssTextBody}
  `;

  const errorStyle = css`
    margin-top: ${(props) => props.theme.spacing.extraTight};
    gap: ${(props) => props.theme.spacing.tight};
    ${cssTextBreakWord}
    ${cssTextError}
  `;

  const labelStyle = css`
    margin-bottom: ${(props) => props.theme.spacing.extraTight};
    ${(props) => (hidden ? cssVisuallyHidden : "")}
    ${cssTextBreakWord}
    ${cssTextLabel}
  `;

  const helpMarkup = help && !error ? <Box css={helpStyle}>{help}</Box> : null;

  const errorMarkup = error ? (
    <Flex css={errorStyle}>
      <Icon $width="1em" src={Exclamation} ariaLabel="Error" />
      {error.message}
    </Flex>
  ) : null;

  return (
    <Box>
      <Box as="label" htmlFor={id} hidden={hidden} css={labelStyle}>
        {label}
      </Box>
      {children}
      {errorMarkup}
      {helpMarkup}
    </Box>
  );
};
