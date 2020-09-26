import React from "react";

import { ThumbnailProps } from "../Thumbnail";
import { AvatarProps } from "../Avatar";

import { Compact, Full, MetaProps } from "./components";

import { Container, OverlayLink } from "./Styles";

export interface PreviewProps {
  compact?: boolean;
  thumbnail: ThumbnailProps;
  meta: MetaProps;
  avatar?: AvatarProps;
}

export const Preview: React.FC<PreviewProps> = (props) => {
  return (
    <Container>
      {props.compact ? <Compact {...props} /> : <Full {...props} />}
      <OverlayLink />
    </Container>
  );
};
