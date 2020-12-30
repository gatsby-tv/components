import React, { forwardRef } from "react";

import { Box, BoxProps } from "@lib/components/Box";

export type VideoProps = React.VideoHTMLAttributes<HTMLElement> & BoxProps;

export const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  return (
    <Box
      ref={ref as React.RefObject<HTMLVideoElement>}
      as="video"
      $width={1}
      $height={1}
      {...props}
    />
  );
});

Video.displayName = "Video";
