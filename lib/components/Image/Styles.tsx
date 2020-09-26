import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-image",
}))`
  position: relative;

  &:before {
    content: "";
    display: block;

    width: 100%;
    padding-top: ${(props) => 100 * props.aspectRatio}%;

    background-color: var(--placeholder-color);
  }
`;

export const Fill = styled.div.attrs((props) => ({
  className: "gz-image-fill",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Content = styled.img.attrs((props) => ({
  className: "gz-image-content",
}))`
  display: block;

  width: 100%;
`;

export const Overlay = styled.div.attrs((props) => ({
  className: "gz-image-overlay",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`;
