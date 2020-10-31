import React from "react";

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
