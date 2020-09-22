import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Viewport, { ViewportProps } from "../Viewport";
import Video, { VideoProps } from "./Video";
import Overlay, { OverlayProps } from "./Overlay";

import "../../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-player",
  style: props.fullscreen
    ? {
        height: "100vh",
        maxHeight: "none",
      }
    : {
        height: "calc((9 / 16) * 100vw)",
        maxHeight: "calc(100vh - 14rem)",
      },
}))`
  position: relative;
  width: 100%;
  min-height: 48rem;
  z-index: 500;

  background: black;
`;

const VideoBox = styled.div.attrs((props) => ({
  className: "gz-player-video-wrapper",
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

type PlayerProps = {
  video: VideoProps;
  fullscreen: boolean;
};

const Player: React.FC<PlayerProps> = (props) => {
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

export { PlayerProps };
export default Player;
