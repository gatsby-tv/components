import styled from "styled-components";

interface ContainerProps {
  readonly aspectRatio: number;
}

export const Container = styled.figure.attrs<ContainerProps>((props) => ({
  className: "gz-viewport",
  style: {
    paddingTop: `${100 * props.aspectRatio}%`,
  },
}))<ContainerProps>`
  position: relative;
  margin: 0;
  width: 100%;

  background-color: black;
`;

export const Fill = styled.div.attrs((props) => ({
  className: "gz-viewport-fill",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Content = styled.div.attrs((props) => ({
  className: "gz-viewport-content",
}))`
  display: block;

  width: 100%;
  height: 100%;
  margin: 0;
  z-index: 0;
`;

export const Overlay = styled.div.attrs((props) => ({
  className: "gz-viewport-overlay",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
`;
