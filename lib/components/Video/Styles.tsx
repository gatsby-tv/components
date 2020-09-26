import styled from "styled-components";

export const VideoBlock = styled.video.attrs((props) => ({
  className: "gz-video",
}))`
  display: block;
  width: 100%;
  height: 100%;
`;
