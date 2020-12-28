import React, { useState, useCallback } from "react";

import { Size } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

export type ImageProps = {
  $width?: Size;
  $aspectRatio?: number;
  $overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Image(props: ImageProps) {
  const { $aspectRatio = 1, $width, $overlay, ariaLabel, ...imgProps } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  return (
    <Viewport
      $placeholder
      $overlay={$overlay}
      $aspectRatio={$aspectRatio}
      $width={$width}
      ariaLabel={ariaLabel}
    >
      <Box
        as="img"
        alt=""
        style={
          loading
            ? { paddingTop: `${100 * $aspectRatio}%`, height: 0 }
            : undefined
        }
        $width={1}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Viewport>
  );
}
