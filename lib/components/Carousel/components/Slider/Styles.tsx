import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-carousel-slider",
  style: {
    width: `${100 * (props.length + 2)}%`,
    left: `${-100 * (props.current + 1)}%`,
    transform: props.transform,
    transition: props.transition,
  },
}))`
  display: flex;
  align-items: center;

  position: relative;
`;
