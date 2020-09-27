import styled from "styled-components";

interface ContainerProps {
  size: string;
}

export const Container = styled.div.attrs((props) => ({
  className: "gz-avatar",
}))<ContainerProps>`
  position: relative;

  width: ${(props) => props.size};
  height: ${(props) => props.size};

  &:before {
    content: "";
    display: block;

    width: 100%;
    padding-top: 100%;
    border-radius: 100%;

    background-color: var(--placeholder-color);
  }
`;

export const Fill = styled.div.attrs((props) => ({
  className: "gz-avatar-fill",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const Content = styled.img.attrs((props) => ({
  className: "gz-avatar-image",
}))`
  display: block;

  width: 100%;
  border-radius: 100%;
`;

export const Overlay = styled.div.attrs((props) => ({
  className: "gz-avatar-overlay",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;
