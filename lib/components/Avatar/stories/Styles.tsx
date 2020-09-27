import styled from "styled-components";

export const Overlay = styled.div.attrs((props) => ({
  className: "sb--gz-avatar-overlay",
}))`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 1.2rem;
  height: 1.2rem;

  background: red;
  border-radius: 100%;
`;
