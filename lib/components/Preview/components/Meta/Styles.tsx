import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-video-meta",
}))`
  display: flex;
  gap: 0.5rem;
`;

export const Link = styled.a.attrs((props) => ({
  className: "gz-video-meta-link",
}))`
  width: fit-content;

  cursor: pointer;
  color: inherit;
  text-decoration: none;
  z-index: 2;

  &:hover * {
    color: var(--font-color);
  }
`;

export const Title = styled.h3.attrs((props) => ({
  className: "gz-video-meta-title",
}))`
  font-stretch: semi-condensed;
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0 0 0.4rem 0;
`;

export const Info = styled.span.attrs((props) => ({
  className: "gz-video-meta-info",
}))`
  font-stretch: semi-condensed;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--font-grey-1);
`;
