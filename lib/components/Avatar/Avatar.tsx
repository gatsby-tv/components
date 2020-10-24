import React from "react";

import { Circle, Viewport } from "@lib/components";
import { useTheme } from "@lib/utilities";
import { IconSize } from "@lib/types";

export type AvatarProps = {
  size?: IconSize;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export function Avatar(props: AvatarProps) {
  const theme = useTheme();
  const { size = "medium", overlay, ariaLabel, ...imgProps } = props;

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
      <Circle as="img" alt="" $width={1} {...imgProps} />
    </Viewport>
  );
}
