import React from "react";
import styled from "styled-components";

import Image, { ImageProps } from "../Image";

const Container = styled.div.attrs((props) => ({
  className: "gz-banner-overlay",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-image: linear-gradient(
    to top,
    var(--dark-grey-3),
    transparent 50%
  );
`;

const MetaContainer = styled.div.attrs((props) => ({
  className: "gz-banner-overlay-meta",
}))`
  position: absolute;
  bottom: 3rem;
  left: 3rem;
`;

const Title = styled.h1.attrs((props) => ({
  className: "gz-banner-overlay-title",
}))`
  margin: 0;
  font-size: 4rem;
`;

const InfoContainer = styled.div.attrs((props) => ({
  className: "gz-banner-overlay-info-container",
}))`
  display: flex;
  gap: 0.5rem;

  margin-left: 2px;
`;

const Info = styled.span.attrs((props) => ({
  className: "gz-banner-overlay-info",
}))`
  font-size: 1.5rem;

  color: var(--font-grey-0);
  font-condensed: semi-condensed;
  font-weight: 500;
`;

const TagContainer = styled.div.attrs((props) => ({
  className: "gz-banner-overlay-tag-container",
}))`
  display: flex;
  gap: 0.5rem;

  margin-top: 0.75rem;
`;

const Tag = styled.a.attrs((props) => ({
  className: "gz-banner-overlay-tag",
}))`
  padding: 0 1rem;
  font-size: 1.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  white-space: nowrap;

  cursor: pointer;
  color: var(--font-grey-0);
  background-color: var(--dark-grey-1);
  border-radius: 1rem;
  font-condensed: semi-condensed;
  font-weight: 500;
  text-decoration: none;

  transition: all 100ms ease;

  &:hover {
    background-color: var(--dark-grey-2);
  }
`;

type MetaProps = {
  title: string;
  info: string[];
  tags: string[];
};

const Meta: React.FC<MetaProps> = (props) => {
  const info = props.info
    .map((value, index) => [
      <Info className="gz-banner-overlay-info-text" key={index}>
        {value}
      </Info>,
      <Info className="gz-banner-overlay-info-dot" key={`${index}/dot`}>
        •
      </Info>,
    ])
    .flat()
    .slice(0, -1);

  const tags = props.tags.map((value, index) => <Tag key={index}>{value}</Tag>);

  return (
    <Container>
      <MetaContainer>
        <Title>{props.title}</Title>
        <InfoContainer>{info}</InfoContainer>
        <TagContainer>{tags}</TagContainer>
      </MetaContainer>
    </Container>
  );
};

type BannerProps = {
  imageUrl: string;
  meta: MetaProps;
};

const Banner: React.FC<BannerProps> = (props) => (
  <Image
    src={props.imageUrl}
    width={16}
    height={9}
    overlay={<Meta {...props.meta} />}
  />
);

export { BannerProps, MetaProps };
export default Banner;
