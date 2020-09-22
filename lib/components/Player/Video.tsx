import React, { useContext } from "react";
import styled from "styled-components";

import { ViewportContext } from "../Viewport";

import "../../config/styles.css";

const VideoBlock = styled.video.attrs((props) => ({
  className: "gz-video",
}))`
  display: block;
  width: 100%;
  height: 100%;
`;

type VideoProps = {
  children: React.Node;
  loop: boolean;
  muted: boolean;
  autoPlay: boolean;
  playsInline: boolean;
  src: string;
  poster: string;
  preload: string;
  crossOrigin: string;
};

const Video: React.FC<VideoProps> = (props) => {
  const [ref, addCallback] = useContext(ViewportContext);

  return (
    <VideoBlock ref={ref} {...props}>
      {props.children}
    </VideoBlock>
  );
};

export { VideoProps };
export default Video;
