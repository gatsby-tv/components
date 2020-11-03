import React, { useState, useCallback } from "react";

import { Circle } from "@lib/components/Circle";
import { Viewport } from "@lib/components/Viewport";
import { useTheme } from "@lib/utilities/use-theme";
import { IconSize } from "@lib/types";

export type AvatarProps = {
  size?: IconSize;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Avatar(props: AvatarProps) {
  const { size = "medium", overlay, ariaLabel, ...imgProps } = props;
  const theme = useTheme();
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  return (
    <Viewport
      placeholder
      rounded
      $width={theme.icon[size]}
      $height={theme.icon[size]}
      aspectRatio={1}
      ariaLabel={ariaLabel}
      overlay={overlay}
    >
      <Circle
        as="img"
        alt=""
        style={loading ? { paddingTop: "100%", height: 0 } : undefined}
        $width={1}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Viewport>
  );
}
