import React from "react";
import styled, { css } from "styled-components";

import {
  cssSize,
  cssProperty,
  cssTextButton,
  cssInputBorder,
} from "@lib/styles";
import { Box, BoxProps } from "@lib/components";

export type ButtonProps = { border?: boolean } & BoxProps & React.ButtonHTMLAttributes<HTMLElement>;

const ButtonBase = styled(Box)<ButtonProps>`
  ${cssTextButton}
  ${(props) => props.border ? cssInputBorder : ""}
  background-color: ${(props) => props.theme.colors.background[3]};
  border-radius: ${(props) => props.theme.border.radius.small};
  padding: ${(props) => `${props.theme.spacing.tight} ${props.theme.spacing.baseTight}`};
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
    background-color: ${(props) => props.theme.colors.background[2].lighten(0.1)};
  }
`;

export const Button: React.FC<ButtonProps> = (props) => (
  <ButtonBase as="button" {...props} />
);
