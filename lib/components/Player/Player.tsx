import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  CSSProperties,
} from "react";

import {
  Box,
  Flex,
  EventListener,
  Viewport,
  Video,
  VideoProps,
} from "@app/components";

interface Dimensions {
  width: number;
  height: number;
}

export interface PlayerProps {
  video: VideoProps;
  fullscreen?: boolean;
}

export const Player: React.FC<PlayerProps> = (props) => {
  const player = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  const handleResize = useCallback(() => {
    if (player?.current) {
      const rect = player.current.getBoundingClientRect();
      setDimensions({ width: rect.width, height: rect.height });
    }
  }, []);

  useEffect(() => handleResize(), []);

  const style: CSSProperties = props.fullscreen
    ? {
        height: "100vh",
        maxHeight: "none",
      }
    : {
        height: "calc((9 / 16) * 100vw)",
        maxHeight: "calc(100vh - 14rem)",
      };

  return (
    <Box ref={player} style={style} boxWidth="100%" minHeight="48rem">
      <Viewport aspectRatio={dimensions.height / dimensions.width}>
        <Flex justify="center" align="center" boxHeight="100%">
          <Video {...props.video} />
        </Flex>
      </Viewport>
      <EventListener event="resize" handler={handleResize} />
    </Box>
  );
};
