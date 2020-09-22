import React, { createContext } from "react";
import styled from "styled-components";

import { GatsbyPlain } from "./Icons";
import Profile, { ProfileProps } from "./Icons/Profile";
import Search, { SearchProps } from "./Search";

import "../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-navbar",
}))`
  display: block;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;

  height: 5rem;
  z-index: 600;

  transition: all 200ms ease;
`;

const PrimaryBox = styled.div.attrs((props) => ({
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

const NavBox = styled.div.attrs((props) => ({
  className: "gz-navbar-content-navigation",
}))`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: stretch;
  justify-content: flex-start;

  width: 100%;
`;

const LogoContainer = styled.div.attrs((props) => ({
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

const LinksBox = styled.div.attrs((props) => ({
  className: "gz-navbar-links",
}))`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Link = styled.a.attrs((props) => ({
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

const HomeLink = styled.a.attrs((props) => ({
  className: "gz-navbar-home-link",
}))``;

const SearchBox = styled.div.attrs((props) => ({
  className: "gz-navbar-search-wrapper",
}))`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const UserBox = styled.div.attrs((props) => ({
  className: "gz-navbar-content-user",
}))`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: stretch;
  justify-content: flex-end;

  width: 100%;
`;

const ProfileBox = styled.a.attrs((props) => ({
  className: "gz-navbar-profile-wrapper",
}))`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;
  padding: 0 1rem;
`;

type NavbarProps = {
  profile: ProfileProps;
  search: SearchProps;
  shadow: boolean;
};

const Navbar: React.FC<NavbarProps> = (props) => {
  const profile = props.profile ? (
    <ProfileBox>
      <Profile {...props.profile} size="3.6rem" />
    </ProfileBox>
  ) : null;

  return (
    <Container>
      <PrimaryBox shadow={props.shadow}>
        <NavBox>
          <HomeLink href="/">
            <LogoContainer>
              <GatsbyPlain />
            </LogoContainer>
          </HomeLink>
          <LinksBox>
            <Link href="/">Subscriptions</Link>
            <Link href="/">Browse</Link>
          </LinksBox>
        </NavBox>
        <SearchBox>
          <Search {...props.search} />
        </SearchBox>
        <UserBox>{profile}</UserBox>
      </PrimaryBox>
    </Container>
  );
};

export { NavbarProps };
export default Navbar;
