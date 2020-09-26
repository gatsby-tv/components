import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-sidebar",
}))`
  display: block;
  flex-grow: 0;
  flex-shrink 0;

  width: 5rem;
  padding-top: 1rem;

  background-color: var(--dark-grey-3);
`;

export const AvatarBox = styled.div.attrs((props) => ({
  className: "gz-sidebar-avatar-container",
}))`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const AvatarContainer = styled.a.attrs((props) => ({
  className: "gz-sidebar-avatar-wrapper",
}))`
  cursor: pointer;
  margin: 0.35rem 0;
`;
