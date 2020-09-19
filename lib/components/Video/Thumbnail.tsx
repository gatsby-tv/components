import React from "react";
import styled from "styled-components";

import Image, { ImageProps } from "../Image";

import "../../config/styles.css";

const Duration = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 1rem;
  padding: 0.1rem 0.4rem;

  border-radius: 2%;
  color: var(--font-color);
  background-color: var(--overlay-contrast);
  font-size: 1.2rem;
`;

type ThumbnailProps = {
  imageUrl: string;
  duration: string;
};

const Thumbnail: React.FC<ThumbnailProps> = (props) => (
  <Image
    src={props.imageUrl}
    width={16}
    height={9}
    overlay={<Duration>{props.duration}</Duration>}
  />
);

export { ThumbnailProps };
export default Thumbnail;
