import React from "react";

import { Image } from "../Image";

import { Duration } from "./Styles";

export interface ThumbnailProps {
  source: string;
  duration?: string;
}

export const Thumbnail: React.FC<ThumbnailProps> = (props) => (
  <Image
    source={props.source}
    aspectRatio={9 / 16}
    overlay={<Duration>{props.duration}</Duration>}
  />
);
