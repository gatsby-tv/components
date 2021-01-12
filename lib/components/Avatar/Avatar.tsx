import React, { useState, useCallback } from "react";
import { useTheme } from "@gatsby-tv/utilities";

import { AvatarSize } from "@lib/types";
import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

export type AvatarProps = {
  ariaLabel?: string;
  size?: string;
  overlay?: React.ReactNode;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Avatar(props: AvatarProps): React.ReactElement {
  const theme = useTheme();
  const { size = theme.avatar.medium, overlay, ariaLabel, ...imgProps } = props;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => setLoading(false), []);

  return (
    <Viewport
      placeholder
      rounded={1}
      w={size}
      h={size}
      aspectRatio={1}
      overlay={overlay}
      ariaLabel={ariaLabel}
    >
      <Box
        as="img"
        alt=""
        style={loading ? { paddingTop: "100%", height: 0 } : undefined}
        w={1}
        rounded={theme.border.radius.full}
        onLoad={handleLoad}
        {...imgProps}
      />
    </Viewport>
  );
}
