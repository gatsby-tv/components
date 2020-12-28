import React, { useState, useCallback } from "react";

import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";
import { useTheme } from "@lib/utilities/use-theme";
import { IconSize } from "@lib/types";

export type AvatarProps = {
  ariaLabel?: string;
  $size?: IconSize;
  $overlay?: React.ReactNode;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Avatar(props: AvatarProps) {
  const theme = useTheme();
  const { $size = "medium", $overlay, ariaLabel, ...imgProps } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  return (
    <Viewport
      $placeholder
      $rounded={1}
      $width={theme.icon[$size]}
      $height={theme.icon[$size]}
      $aspectRatio={1}
      $overlay={$overlay}
      ariaLabel={ariaLabel}
    >
      <Box
        as="img"
        alt=""
        style={loading ? { paddingTop: "100%", height: 0 } : undefined}
        $rounded={theme.border.radius.full}
        $width={1}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Viewport>
  );
}
