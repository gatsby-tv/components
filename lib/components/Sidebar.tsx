import React from "react";
import styled from "styled-components";

import Profile, { ProfileProps } from "./Icons/Profile";

const Container = styled.div.attrs((props) => ({
  className: "gz-sidebar",
}))`
  display: block;
  flex-grow: 0;
  flex-shrink 0;

  width: 5rem;
  padding-top: 1rem;

  background-color: var(--dark-grey-3);
`;

const ProfilesBox = styled.div.attrs((props) => ({
  className: "gz-sidebar-profile-container",
}))`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ProfileContainer = styled.a.attrs((props) => ({
  className: "gz-sidebar-profile-wrapper",
}))`
  cursor: pointer;
  margin: 0.35rem 0;
`;

type SidebarProps = {
  profiles: ProfileProps[];
};

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const profiles = props.profiles.map(
    (profile: ProfileProps, index: number) => (
      <ProfileContainer key={profile.imageUrl}>
        <Profile {...profile} size="3.6rem" />
      </ProfileContainer>
    )
  );

  return (
    <Container>
      <ProfilesBox>{profiles}</ProfilesBox>
    </Container>
  );
};

export default Sidebar;
export { SidebarProps };
