import styled from "styled-components";

export const Container = styled.div.attrs(props => ({
  className: "sb--gz-image-wrapper",
}))`
  width: 25rem;
`

export const Overlay = styled.div.attrs(props => ({
  className: "sb--gz-image-overlay",
}))`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  cursor: pointer;

  transition: all 250ms ease;

  &:hover {
    box-shadow: inset 1rem 0 3rem 0 var(--dark-grey-0),
      inset -1rem 0 3rem 0 var(--dark-grey-0);
  }
`
