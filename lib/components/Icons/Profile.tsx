import React from "react";
import styled from "styled-components";

import Image, { ImageProps } from "../Image";

const Container = styled.div.attrs((props) => ({
  className: "gz-profile",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
`;

type ProfileProps = {
  imageUrl: string;
  size: string;
};

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <Container size={props.size}>
      <Image src={props.imageUrl} radius="100%" />
    </Container>
  );
};

export default Profile;
export { ProfileProps };
