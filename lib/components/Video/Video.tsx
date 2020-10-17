import React, { forwardRef } from "react";

import { Box, BoxProps } from "@lib/components";

export type VideoProps = React.VideoHTMLAttributes<HTMLElement> & BoxProps;

export const Video = forwardRef<HTMLVideoElement, VideoProps>((props, ref) => {
  return (
    <Box
      ref={ref as React.RefObject<HTMLVideoElement>}
      as="video"
      $fill
      {...props}
    />
  );
});
