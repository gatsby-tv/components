import React, { useContext, useCallback, useEffect } from "react";
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
  const [viewport, video, callbacks, setCallbacks] = useContext(
    ViewportContext
  );

  const addCallback = useCallback(
    ({ type, callback }) => {
      video.current.addEventListener(type, callback);
      return () => video.current.removeEventListener(type, callback);
    },
    [video.current]
  );

  useEffect(() => {
    const cleanups = callbacks.map((callback, index) => addCallback(callback));
    return () => cleanups.forEach((cleanup, index) => cleanup());
  }, [video.current, callbacks]);

  return (
    <VideoBlock ref={video} {...props}>
      {props.children}
    </VideoBlock>
  );
};

export { VideoProps };
export default Video;
