import React from "react";
import styled, { css } from "styled-components";

import {
  cssSize,
  cssProperty,
  cssTextInput,
  cssInputBorder,
} from "@lib/styles";
import { Box, BoxProps } from "@lib/components";

export type ButtonProps = BoxProps & React.ButtonHTMLAttributes<HTMLElement>;

const ButtonBase = styled(Box)<ButtonProps>`
  ${cssTextInput}
  ${cssInputBorder}
  text-align: center;
  cursor: pointer;
  display: block;
  position: relative;
  outline: none;
`;

export const Button: React.FC<ButtonProps> = (props) => (
  <ButtonBase as="button" {...props} />
);
