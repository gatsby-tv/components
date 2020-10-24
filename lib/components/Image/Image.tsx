import React from "react";

import { Size } from "@lib/types";
import { Box, Viewport } from "@lib/components";

export type ImageProps = {
  $width?: Size;
  aspectRatio?: number;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Image(props: ImageProps) {
  const { aspectRatio = 1, $width, overlay, ariaLabel, ...imgProps } = props;

  return (
    <Viewport
      placeholder
      aspectRatio={aspectRatio}
      ariaLabel={ariaLabel}
      overlay={overlay}
      $width={$width}
    >
      <Box as="img" alt="" $width={1} {...imgProps} />
    </Viewport>
  );
}
