import React from "react";

import { Size } from "@app/types";
import { Box, Position } from "@app/components";

export type ImageProps = {
  width?: Size;
  aspectRatio?: number;
  overlay?: React.ReactNode;
  ariaLabel?: string;
} & React.ImgHTMLAttributes<HTMLElement>;

export const Image: React.FC<ImageProps> = (props) => {
  const { aspectRatio = 1, width, overlay, ariaLabel, ...imgProps } = props;

  return (
    <Box boxWidth={width}>
      <Box aria-label={ariaLabel} paddingTop={aspectRatio} bg="placeholder">
        <Position fill>
          <Box as="img" alt="" boxWidth="100%" {...imgProps} />
          <Position fill>{overlay}</Position>
        </Position>
      </Box>
    </Box>
  );
};
