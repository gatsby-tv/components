import React from "react";
import styled from "styled-components";

import Thumbnail, { ThumbnailProps } from "./Thumbnail";
import Meta, { MetaProps } from "./Meta";
import Profile, { ProfileProps } from "../Icons/Profile";

import "../../config/styles.css";

const Container = styled.div`
  flex-shrink: 1;
  flex-grow: 1;

  position: relative;
`;

const OverlayLink = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

const Link = styled.a`
  width: fit-content;

  cursor: pointer;
  color: inherit;
  text-decoration: none;
  z-index: 2;

  &:hover * {
    color: var(--font-color);
  }
`;

const PrimaryBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SecondaryBox = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;

  margin-top: 1rem;
`;

const TertiaryBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const ProfileContainer = styled.div`
  margin-right: 1rem;
`;

const CompactThumbnailContainer = styled.div`
  width: 100%;
  max-width: 30rem;
  min-width: 15rem;
`;

const CompactPrimaryBox = styled.div`
  display: flex;
`;

const CompactSecondaryBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;

  margin-left: 1rem;
`;

type PreviewProps = {
  thumbnail: ThumbnailProps;
  profile: ProfileProps | null;
  meta: MetaProps;
  compact: boolean;
};

const FullContent: React.FC<PreviewProps> = (props) => (
  <PrimaryBox>
    <Thumbnail {...props.thumbnail} />
    <SecondaryBox>
      {props.profile && (
        <ProfileContainer>
          <Link>
            <Profile {...props.profile} size="4rem" />
          </Link>
        </ProfileContainer>
      )}
      <TertiaryBox>
        <Meta {...props.meta} />
      </TertiaryBox>
    </SecondaryBox>
  </PrimaryBox>
);

const CompactContent: React.FC<PreviewProps> = (props) => (
  <CompactPrimaryBox>
    <CompactThumbnailContainer>
      <Thumbnail {...props.thumbnail} />
    </CompactThumbnailContainer>
    <CompactSecondaryBox>
      <Meta {...props.meta} />
    </CompactSecondaryBox>
  </CompactPrimaryBox>
);

const Preview: React.FC<PreviewProps> = (props) => {
  return (
    <Container className="gz-preview">
      {props.compact ? (
        <CompactContent {...props} />
      ) : (
        <FullContent {...props} />
      )}
      <OverlayLink />
    </Container>
  );
};

export { PreviewProps };
export default Preview;
