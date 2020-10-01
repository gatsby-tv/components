import React from "react";

import { Box, BoxProps, Position, Circle } from "@app/components";

type AvatarSize = "small" | "medium" | "large";

export type AvatarProps = {
  size?: AvatarSize;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export const Avatar: React.FC<AvatarProps> = (props) => {
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
    <Box boxWidth={boxSize} boxHeight={boxSize}>
      <Circle
        as="span"
        aria-label={ariaLabel}
        paddingTop="100%"
        bg="placeholder"
      >
        <Position fill>
          <Circle as="img" alt="" boxWidth="100%" {...imgProps} />
          <Position fill>{overlay}</Position>
        </Position>
      </Circle>
    </Box>
  );
};
