import styled from "styled-components"

export const Container = styled.div.attrs((props) => ({
  className: "gz-carousel",
}))`
  position: relative;
  margin: 0 -0.7rem;
`;

export const PrimaryBox = styled.div.attrs((props) => ({
  className: "gz-carousel-content",
}))`
  display: flex;
  align-items: center;
`;

export const Mask = styled.div.attrs((props) => ({
  className: "gz-carousel-mask",
}))`
  width: 100%;

  overflow: hidden;
`;

export const Group = styled.div.attrs((props) => ({
  className: "gz-carousel-group",
  width: undefined,
  style: {
    width: `${props.width}px`,
  },
}))`
  display: flex;
`;

export const Slide = styled.div.attrs((props) => ({
  className: "gz-carousel-slide",
  style: {
    width: `${100 / props.groupSize}%`,
  },
}))`
  display: flex;
  justify-content: center;

  position: relative;
  z-index: 0;
  margin: 0 0.7rem;

  cursor: pointer;

  transition: all 250ms ease;

  &:before {
    content: "";
    display: block;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;

    transition: all 250ms ease;
  }

  &:hover {
    z-index: 1;
    transform: scale(1.1);

    &:before {
      box-shadow: inset 1rem 0 3rem 0 var(--dark-grey-0),
        inset -1rem 0 3rem 0 var(--dark-grey-0);
    }
  }
`;

export const Item = styled.div.attrs((props) => ({
  className: "gz-carousel-item",
}))`
  width: 100%;
  z-index: 2;
`;
