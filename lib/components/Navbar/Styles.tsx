import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-navbar",
}))`
  display: block;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;

  height: 5rem;
  z-index: 600;

  transition: all 200ms ease;
`;

export const PrimaryBox = styled.div.attrs((props) => ({
  className: "gz-navbar-content",
}))`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;

  height: 100%;
  background-color: var(--dark-grey-1);
  box-shadow: ${(props) =>
    props.shadow
      ? "0 2px 1px rgba(0, 0, 0, 0.9), 0 2px 1px rgba(0, 0, 0, 0.1)"
      : "none"};
`;

export const NavBox = styled.div.attrs((props) => ({
  className: "gz-navbar-content-navigation",
}))`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: stretch;
  justify-content: flex-start;

  width: 100%;
`;

export const LogoContainer = styled.div.attrs((props) => ({
  className: "gz-navbar-logo-wrapper",
}))`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  padding: 0 1rem;
  height: 100%;

  svg {
    width: 3rem;
    height: 3rem;
  }
`;

export const LinksBox = styled.div.attrs((props) => ({
  className: "gz-navbar-links",
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Link = styled.a.attrs((props) => ({
  className: "gz-navbar-link",
}))`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0 1rem;
  font-family: "Noto Sans";
  font-stretch: semi-condensed;
  font-weight: 500;
  font-size: 1.6rem;
  text-decoration: none;
  color: var(--font-color) !important;
`;

export const HomeLink = styled.a.attrs((props) => ({
  className: "gz-navbar-home-link",
}))``;

export const SearchBox = styled.div.attrs((props) => ({
  className: "gz-navbar-search-wrapper",
}))`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

export const UserBox = styled.div.attrs((props) => ({
  className: "gz-navbar-content-user",
}))`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: stretch;
  justify-content: flex-end;

  width: 100%;
`;

export const AvatarBox = styled.a.attrs((props) => ({
  className: "gz-navbar-avatar-wrapper",
}))`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;
  padding: 0 1rem;
`;
