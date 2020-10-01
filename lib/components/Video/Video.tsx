import React from "react";

import { Box, BoxProps, EventListenerGroup } from "@app/components";
import { useViewport } from "@app/util/viewport";

export type VideoProps = React.VideoHTMLAttributes<HTMLElement> & BoxProps;

export const Video: React.FC<VideoProps> = (props) => {
  const { video, handlers } = useViewport();

  return (
    <>
      <Box ref={video} as="video" boxWidth="100%" boxHeight="100%" {...props} />
      <EventListenerGroup for={video ?? undefined} handlers={handlers} />
    </>
  );
};
