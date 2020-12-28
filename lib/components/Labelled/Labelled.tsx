import React from "react";
import { css } from "styled-components";
import { Exclamation } from "@gatsby-tv/icons";

import {
  cssTextBreakWord,
  cssTextBody,
  cssTextSubdued,
  cssTextError,
  cssTextLabel,
} from "@lib/styles/typography";
import { cssVisuallyHidden } from "@lib/styles/visually-hidden";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { useTheme } from "@lib/utilities/use-theme";

export interface LabelledProps {
  children?: React.ReactNode;
  id: string;
  $label: string;
  $help?: string;
  $error?: Error;
  $hidden?: boolean;
}

export function Labelled(props: LabelledProps) {
  const { children, id, $label, $help, $error, $hidden } = props;
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
    ${(props) => ($hidden ? cssVisuallyHidden : "")}
    ${cssTextBreakWord}
    ${cssTextLabel}
  `;

  const helpMarkup =
    $help && !$error ? <Box css={helpStyle}>{$help}</Box> : null;

  const errorMarkup = $error ? (
    <Flex css={errorStyle}>
      <Icon $source={Exclamation} $width="1em" ariaLabel="Error" />
      {$error.message}
    </Flex>
  ) : null;

  return (
    <Box>
      <Box as="label" htmlFor={id} hidden={$hidden} css={labelStyle}>
        {$label}
      </Box>
      {children}
      {errorMarkup}
      {helpMarkup}
    </Box>
  );
}
