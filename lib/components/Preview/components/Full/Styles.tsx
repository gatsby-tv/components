import styled from "styled-components";

export const PrimaryBox = styled.div.attrs((props) => ({
  className: "gz-preview-container",
}))`
  display: flex;
  flex-direction: column;
`;

export const SecondaryBox = styled.div.attrs((props) => ({
  className: "gz-preview-description",
}))`
  display: flex;
  flex-shrink: 0;
  flex-grow: 0;

  margin-top: 1rem;
`;

export const TertiaryBox = styled.div.attrs((props) => ({
  className: "gz-preview-meta-wrapper",
}))`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

export const Link = styled.a.attrs((props) => ({
  className: "gz-preview-link",
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

export const AvatarContainer = styled.div.attrs((props) => ({
  className: "gz-preview-avatar-wrapper",
}))`
  margin-right: 1rem;
`;
