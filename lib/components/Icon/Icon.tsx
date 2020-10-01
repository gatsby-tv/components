import React from "react";

import { Color, IconSource } from "@app/types";
import { BoxProps } from "@app/components";

import { IconWrapper } from "./components";

export interface IconProps extends BoxProps {
  src: IconSource;
  ariaLabel?: string;
}

export const Icon: React.FC<IconProps> = (props) => {
  const { src: SvgComponent, ariaLabel, ...boxProps } = props;

  return (
    <IconWrapper as="span" aria-label={ariaLabel} {...boxProps}>
      <SvgComponent aria-hidden="true" focusable="false" />
    </IconWrapper>
  );
};
