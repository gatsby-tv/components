import React from "react";

import { Avatar, AvatarProps, AvatarSize } from "../Avatar";

import { Container, AvatarBox, AvatarContainer } from "./Styles";

export interface SidebarProps {
  avatars: AvatarProps[];
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  const avatar = props.avatars.map((avatar, index) => (
    <AvatarContainer key={avatar.source}>
      <Avatar {...avatar} size={AvatarSize.Small} />
    </AvatarContainer>
  ));

  return (
    <Container>
      <AvatarBox>{profiles}</AvatarBox>
    </Container>
  );
};
