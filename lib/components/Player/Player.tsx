import React, { useState, useEffect, useRef } from "react";

import { Viewport, ViewportProps } from "../Viewport";
import { Video, VideoProps } from "../Video";

import { Overlay } from "./components";

import { Container, VideoBox } from "./Styles";

export interface PlayerProps {
  video: VideoProps;
  fullscreen?: boolean;
}

export const Player: React.FC<PlayerProps> = (props) => {
  const container = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: container.current.offsetWidth,
        height: container.current.offsetHeight,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [container.current]);

  return (
    <Container ref={container} fullscreen={props.fullscreen}>
      <Viewport
        width={dimensions.width}
        height={dimensions.height}
        overlay={<Overlay />}
      >
        <VideoBox>
          <Video {...props.video} />
        </VideoBox>
      </Viewport>
    </Container>
  );
};
