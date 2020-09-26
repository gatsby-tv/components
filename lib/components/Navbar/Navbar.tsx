import React from "react";

import { GatsbyPlain } from "../Icons";
import { Avatar, AvatarProps, AvatarSize } from "../Avatar";
import { Search, SearchProps } from "../Search";

import {
  Container,
  PrimaryBox,
  NavBox,
  LogoContainer,
  LinksBox,
  Link,
  HomeLink,
  SearchBox,
  UserBox,
  AvatarBox,
} from "./Styles";

export interface NavbarProps {
  avatar?: AvatarProps;
  search: SearchProps;
  shadow: boolean;
}

export const Navbar: React.FC<NavbarProps> = (props) => {
  const avatar = props.avatar ? (
    <AvatarBox>
      <Avatar {...props.avatar} size={AvatarSize.Small} />
    </AvatarBox>
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
        <UserBox>{avatar}</UserBox>
      </PrimaryBox>
    </Container>
  );
};
