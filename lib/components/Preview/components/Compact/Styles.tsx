import styled from "styled-components";

export const PrimaryBox = styled.div.attrs((props) => ({
  className: "gz-preview-compact-container",
}))`
  display: flex;
`;

export const ThumbnailContainer = styled.div.attrs((props) => ({
  className: "gz-preview-compact-thumbnail-wrapper",
}))`
  width: 100%;
  max-width: 30rem;
  min-width: 15rem;
`;

export const SecondaryBox = styled.div.attrs((props) => ({
  className: "gz-preview-compact-description",
}))`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 0;

  margin-left: 1rem;
`;
