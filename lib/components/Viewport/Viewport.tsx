import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  CSSProperties,
} from "react";
import { css } from "styled-components";

import { Size } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { ifExists } from "@lib/utilities/if-exists";
import { useTheme } from "@lib/utilities/use-theme";
import { Box, BoxProps } from "@lib/components/Box";

export interface ViewportProps extends BoxProps {
  children?: React.ReactNode;
  overlay?: React.ReactNode;
  rounded?: boolean;
  placeholder?: boolean;
  aspectRatio?: number;
  ariaLabel?: string;
}

export const Viewport = forwardRef<HTMLElement, ViewportProps>((props, ref) => {
  const {
    children,
    overlay,
    placeholder,
    rounded,
    aspectRatio,
    ariaLabel,
    $width = 1,
    ...boxProps
  } = props;

  const theme = useTheme();

  const style = css`
    width: 100%;
    background-color: ${placeholder ? theme.colors.placeholder : "black"};
    ${cssProperty("border-radius", ifExists(rounded, "100%"))}
  `;

  return (
    <Box
      as="figure"
      ref={ref as React.RefObject<HTMLElement>}
      $width={$width}
      aria-label={ariaLabel}
      {...boxProps}
    >
      <Box
        absolute
        css={style}
        style={{ paddingTop: `${100 * (aspectRatio ?? 9 / 16)}%` }}
      />
      {children}
      <Box absolute $fill>
        {overlay}
      </Box>
    </Box>
  );
});
