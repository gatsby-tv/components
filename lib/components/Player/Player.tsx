import React, { useState, useEffect, useRef } from "react";

import { Viewport, ViewportProps } from "../Viewport";
import { Video, VideoProps } from "../Video";

import { Overlay } from "./components";

import { Container, VideoBox } from "./Styles";

interface DimensionType {
  width: number;
  height: number;
}

export interface PlayerProps {
  video: VideoProps;
  fullscreen?: boolean;
}

export const Player: React.FC<PlayerProps> = (props) => {
  const container = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<DimensionType>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: container?.current?.offsetWidth || 0,
        height: container?.current?.offsetHeight || 0,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [container?.current]);

  return (
    <Container ref={container} fullscreen={props.fullscreen}>
      <Viewport
        aspectRatio={dimensions.height / dimensions.width}
        overlay={<Overlay />}
      >
        <VideoBox>
          <Video {...props.video} />
        </VideoBox>
      </Viewport>
    </Container>
  );
};
