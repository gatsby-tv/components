import React from "react";
import styled from "styled-components";

import Gatsby from "./Icons/Gatsby";
import Profile, { ProfileProps } from "./Icons/Profile";
import Search, { SearchProps } from "./Search";

import "../config/styles.css";

const Container = styled.div`
  display: block;
  flex-grow: 0 !important;
  flex-shrink: 0 !important;

  height: 5rem;
  z-index: 600;
`;

const PrimaryBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;

  height: 100%;
  background-color: var(--dark-grey-1);
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.9), 0 2px 1px rgba(0, 0, 0, 0.1);
`;

const NavBox = styled.div`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: stretch;
  justify-content: flex-start;

  width: 100%;
`;

const LogoContainer = styled.div`
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

const LinksBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Link = styled.a`
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

const HomeLink = styled.a``;

const SearchBox = styled.div`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const UserBox = styled.div`
  display: flex;
  flex-shrink: 1 !important;
  flex-grow: 1 !important;
  align-items: stretch;
  justify-content: flex-end;

  width: 100%;
`;

const ProfileBox = styled.a`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  cursor: pointer;
  padding: 0 1rem;
`;

type NavbarProps = {
  profile: ProfileProps;
  search: SearchProps;
};

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  const profile = props.profile ? (
    <ProfileBox>
      <Profile {...props.profile} size="3.6rem" />
    </ProfileBox>
  ) : null;

  return (
    <Container>
      <PrimaryBox>
        <NavBox>
          <HomeLink href="/">
            <LogoContainer>
              <Gatsby />
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
