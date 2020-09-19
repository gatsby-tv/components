import React from "react";
import styled from "styled-components";

import Thumbnail, { ThumbnailProps } from "./Thumbnail";
import Meta, { MetaProps } from "./Meta";
import Image, { ImageProps } from "../Image";

import "../../config/styles.css";

const Container = styled.div`
  flex-shrink: 1;
  flex-grow: 1;

  position: relative;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  max-width: 30rem;
  min-width: 15rem;
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

const PrimaryBox = styled.div`
  display: flex;
`;

const SecondaryBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;

  margin-left: 1rem;
`;

type CompactProps = {
  thumbnail: ThumbnailProps;
  meta: MetaProps;
};

const Compact: React.FC<CompactProps> = (props) => {
  return (
    <Container>
      <PrimaryBox>
        <ThumbnailContainer>
          <Thumbnail {...props.thumbnail} />
        </ThumbnailContainer>
        <SecondaryBox>
          <Meta {...props.meta} />
        </SecondaryBox>
      </PrimaryBox>
      <OverlayLink />
    </Container>
  );
};

export { CompactProps };
export default Compact;
