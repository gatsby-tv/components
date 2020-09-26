import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-preview",
}))`
  flex-shrink: 1;
  flex-grow: 1;

  position: relative;
`;

export const OverlayLink = styled.a.attrs((props) => ({
  className: "gz-preview-overlay-link",
}))`
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
