import React, { useState, useCallback } from "react";
import { IPFSContent } from "@gatsby-tv/types";
import { useTheme, useIPFSContent } from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { Viewport } from "@lib/components/Viewport";

type AvatarBaseProps = {
  ariaLabel?: string;
  size?: string;
  overlay?: React.ReactNode;
} & Omit<React.ImgHTMLAttributes<HTMLElement>, "src">;

type AvatarURLProps = AvatarBaseProps & { src?: string };

type AvatarIPFSProps = AvatarBaseProps & { src: IPFSContent };

export type AvatarProps = AvatarURLProps | AvatarIPFSProps;

function isAvatarURLProps(props: AvatarProps): props is AvatarURLProps {
  return typeof (props as AvatarURLProps).src !== "object";
}

function AvatarURL(props: AvatarURLProps): React.ReactElement {
  const theme = useTheme();
  const { size = theme.avatar.base, overlay, ariaLabel, ...imgProps } = props;
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

function AvatarIPFS(props: AvatarIPFSProps): React.ReactElement {
  const { src, ...rest } = props;
  const { url } = useIPFSContent(src);

  return <AvatarURL src={url} {...rest} />;
}

export function Avatar(props: AvatarProps): React.ReactElement {
  if (isAvatarURLProps(props)) {
    return <AvatarURL {...props} />;
  } else {
    return <AvatarIPFS {...props} />;
  }
}
