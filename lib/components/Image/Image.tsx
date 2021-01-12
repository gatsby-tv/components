import React, { useState, useEffect, useCallback } from "react";

import { Size } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

export type ImageProps = {
  w?: Size;
  rounded?: Size;
  aspectRatio?: number;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Image(props: ImageProps): React.ReactElement {
  const {
    aspectRatio = 1,
    w,
    overlay,
    rounded,
    ariaLabel,
    ...imgProps
  } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  useEffect(() => setLoading(true), [imgProps.src]);

  return (
    <Viewport
      placeholder
      overlay={overlay}
      aspectRatio={aspectRatio}
      w={w}
      rounded={rounded}
      ariaLabel={ariaLabel}
    >
      <Box
        as="img"
        alt=""
        style={
          loading
            ? { paddingTop: `${100 * aspectRatio}%`, height: 0 }
            : undefined
        }
        w={1}
        rounded={rounded}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Viewport>
  );
}
