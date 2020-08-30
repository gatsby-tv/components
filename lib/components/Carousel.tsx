import React, { useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { Global } from "./styles";

type Item = {
  title: string,
  thumbnail: string
}

type CarouselProps = {
  width: string,
  items: Item[]
}

const Root = styled(Global)`
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 30px;
`;

const Arrow = styled.div`
  :hover {
    cursor: pointer;
  }
`;

const Thumbnails = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: scroll;
`;

const Thumbnail = styled.img`
  width: 150px;
  height: 300px;
  border-radius: 5px;
`;

const scrollLeft = (thumbnails: HTMLElement | null) => {
  if (!thumbnails) return;
  thumbnails.scrollLeft -= thumbnails.clientWidth;
}

const scrollRight = (thumbnails: HTMLElement | null) => {
  if (!thumbnails) return;
  thumbnails.scrollLeft += thumbnails.clientWidth;
}

const Carousel: React.FC<CarouselProps> = (props: CarouselProps) => {

  const items = props.items.map((item: Item, index: number) => (
    <Thumbnail key={index} src={item.thumbnail} alt={item.title} />
  ));
  const thumbnails = useRef(null);

  return (
    <Root>
      <Arrow onClick={() => scrollLeft(thumbnails.current)}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Arrow>
      <Thumbnails ref={thumbnails}>
        {items}
      </Thumbnails>
      <Arrow onClick={() => scrollRight(thumbnails.current)}>
        <FontAwesomeIcon icon={faChevronRight} />
      </Arrow>
    </Root>
  );
}

export { CarouselProps };
export default Carousel;
