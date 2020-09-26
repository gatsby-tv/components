import React from "react";

import { Thumbnail, ThumbnailProps } from "../../../Thumbnail";
import { Meta, MetaProps } from "../Meta";

import { PrimaryBox, ThumbnailContainer, SecondaryBox } from "./Styles";

export interface CompactProps {
  thumbnail: ThumbnailProps;
  meta: MetaProps;
}

export const Compact: React.FC<CompactProps> = (props) => (
  <PrimaryBox>
    <ThumbnailContainer>
      <Thumbnail {...props.thumbnail} />
    </ThumbnailContainer>
    <SecondaryBox>
      <Meta {...props.meta} />
    </SecondaryBox>
  </PrimaryBox>
);
