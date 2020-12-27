import React from "react";
import { css } from "styled-components";

import { Color, IconSource } from "@lib/types";
import { Box, BoxProps } from "@lib/components/Box";

export interface IconProps {
  source: IconSource;
  ariaLabel?: string;
}

export function Icon(props: IconProps & BoxProps) {
  const { source: SvgComponent, ariaLabel, ...boxProps } = props;

  const style = css`
    & > svg {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  `;

  return (
    <Box as="span" css={style} aria-label={ariaLabel} {...boxProps}>
      <SvgComponent aria-hidden="true" focusable="false" />
    </Box>
  );
}
