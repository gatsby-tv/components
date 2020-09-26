import styled from "styled-components";

export const Duration = styled.div.attrs((props) => ({
  className: "gz-thumbnail-duration",
}))`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 1rem;
  padding: 0.1rem 0.4rem;

  border-radius: 0.2rem;
  color: var(--font-color);
  background-color: var(--overlay-contrast);
  font-size: 1.2rem;
`;
