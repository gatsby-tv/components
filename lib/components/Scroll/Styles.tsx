import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-scroll",
}))`
  overflow-y: auto;
  height: 100%;
  backface-visibility: hidden;

  &::-webkit-scrollbar {
    width: 1rem;
    height: 1rem;
  }

  &::-webkit-scrollbar-corner {
    color: transparent;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dark-grey-2);
    border-radius: 2rem;

    transition: all 100ms ease;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--dark-grey-3);
  }
`;

export const HiddenContainer = styled(Container).attrs((props) => ({
  className: "gz-hidden-scroll",
}))`
  &::-webkit-scrollbar {
    width: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    background-color: transparent;
    border: none;
  }
`;
