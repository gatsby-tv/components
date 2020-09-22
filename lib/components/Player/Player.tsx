import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import Viewport, { ViewportProps } from "../Viewport";
import Video, { VideoProps } from "./Video";

import "../../config/styles.css";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc((9 / 16) * 100vw);
  max-height: calc(100vh - 14rem);
  min-height: 48rem;
  z-index: 500;

  background: black;

  &:fullscreen {
    height: 100vh;
    z-index: 700;

    transform: translateY(-5rem);
  }
`;

const VideoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

type PlayerProps = {
  video: VideoProps;
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
    <Container className="gz-player" ref={container}>
      <Viewport width={dimensions.width} height={dimensions.height}>
        <VideoBox>
          <Video {...props.video} />
        </VideoBox>
      </Viewport>
    </Container>
  );
};

export { PlayerProps };
export default Player;
