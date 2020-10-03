import React from "react";

import { Circle, Viewport } from "@app/components";
import { useTheme } from "@app/utilities";

type AvatarSize = "small" | "medium" | "large";

export type AvatarProps = {
  size?: AvatarSize;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export const Avatar: React.FC<AvatarProps> = (props) => {
  const theme = useTheme();
  const { size = "medium", overlay, ariaLabel, ...imgProps } = props;

  let boxSize: string;
  switch (size) {
    case "small":
      boxSize = "3.6rem";
      break;

    case "medium":
      boxSize = "4.4rem";
      break;

    case "large":
      boxSize = "6rem";
      break;
  }

  return (
    <Viewport
      placeholder
      rounded
      $width={boxSize}
      $height={boxSize}
      aspectRatio={1}
      ariaLabel={ariaLabel}
      overlay={overlay}
    >
      <Circle as="img" alt="" $width={1} {...imgProps} />
    </Viewport>
  );
};
