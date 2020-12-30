import React, { forwardRef } from "react";
import { useTheme } from "@gatsby-tv/utilities";

import { Box, BoxProps } from "@lib/components/Box";

export interface ViewportProps {
  children?: React.ReactNode;
  ariaLabel?: string;
  $overlay?: React.ReactNode;
  $placeholder?: boolean;
  $aspectRatio?: number;
}

export const Viewport = forwardRef<HTMLElement, ViewportProps & BoxProps>(
  (props: ViewportProps & BoxProps, ref) => {
    const {
      children,
      ariaLabel,
      $overlay,
      $placeholder,
      $aspectRatio,
      $rounded,
      $width = 1,
      ...boxProps
    } = props;

    const theme = useTheme();

    return (
      <Box
        as="figure"
        ref={ref as React.RefObject<HTMLElement>}
        $width={$width}
        $rounded={$rounded}
        aria-label={ariaLabel}
        {...boxProps}
      >
        <Box
          style={{ paddingTop: `${100 * ($aspectRatio ?? 9 / 16)}%` }}
          $absolute
          $bg={$placeholder ? theme.colors.placeholder : "black"}
          $width={1}
          $rounded={$rounded}
        />
        {children}
        <Box $absolute $fill>
          {$overlay}
        </Box>
      </Box>
    );
  }
);

Viewport.displayName = "Viewport";
