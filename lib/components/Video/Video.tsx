import React, { useContext, useCallback, useEffect } from "react";

import { ViewportContext } from "../Viewport";

import { VideoBlock } from "./Styles";

export interface VideoProps {
  source: string;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  poster?: string;
  preload?: string;
  crossOrigin?: string;
}

export const Video: React.FC<VideoProps> = (props) => {
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

  return <VideoBlock ref={video} {...props} />;
};
