import React from "react";
import styled, { css } from "styled-components";

import { cssInputBorder } from "@lib/styles/borders";
import { cssTextButton } from "@lib/styles/typography";
import { Box, BoxProps } from "@lib/components/Box";

export type FormButtonProps = { border?: boolean } & BoxProps &
  React.ButtonHTMLAttributes<HTMLElement>;

const FormButtonBase = styled(Box)<FormButtonProps>`
  ${cssTextButton}
  ${(props) => (props.border ? cssInputBorder : "")}
  background-color: ${(props) => props.theme.colors.background[3]};
  border-radius: ${(props) => props.theme.border.radius.small};
  padding: ${(props) =>
    `${props.theme.spacing.tight} ${props.theme.spacing.baseTight}`};
  text-align: center;
  cursor: pointer;
  display: block;
  position: relative;
  outline: none;
  transition: all ${(props) => props.theme.duration.fastest} ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.background[4]};
  }

  &:active {
    background-color: ${(props) =>
      props.theme.colors.background[2].lighten(0.1)};
  }
`;

export const FormButton: React.FC<FormButtonProps> = (props) => (
  <FormButtonBase as="button" {...props} />
);
