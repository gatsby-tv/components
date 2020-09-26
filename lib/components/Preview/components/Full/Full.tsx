import React from "react";

import { Thumbnail, ThumbnailProps } from "../../../Thumbnail";
import { Avatar, AvatarProps, AvatarSize } from "../../../Avatar";
import { Meta, MetaProps } from "../Meta";

import {
  PrimaryBox,
  SecondaryBox,
  TertiaryBox,
  Link,
  AvatarContainer,
} from "./Styles";

export interface FullProps {
  thumbnail: ThumbnailProps;
  meta: MetaProps;
  avatar?: AvatarProps;
}

export const Full: React.FC<FullProps> = (props) => (
  <PrimaryBox>
    <Thumbnail {...props.thumbnail} />
    <SecondaryBox>
      {props.avatar && (
        <AvatarContainer>
          <Link>
            <Avatar {...props.avatar} size={AvatarSize.Medium} />
          </Link>
        </AvatarContainer>
      )}
      <TertiaryBox>
        <Meta {...props.meta} />
      </TertiaryBox>
    </SecondaryBox>
  </PrimaryBox>
);
