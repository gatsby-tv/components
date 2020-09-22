import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { ModalContext } from "../Modal";
import Banner, { BannerProps } from "./Banner";
import Stream, { StreamProps } from "../Stream";
import Scroll, { ScrollProps } from "../Scroll";

import "../../config/styles.css";

const Container = styled.div.attrs((props) => ({
  className: "gz-panel",
}))`
  position: relative;
  width: 90rem;
  height: calc(100vh - 10rem);

  overflow: hidden;
  background-color: var(--dark-grey-3);
  border-radius: 0.5rem;
  margin: 7rem 0 3rem 0;
  z-index: 1000;

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(10%);
    }

    80% {
      opacity: 1;
    }

    100% {
      transform: translateY(0);
    }
  }

  animation-name: slide;
  animation-timing-function: ease;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
`;

const CloseContainer = styled.button.attrs((props) => ({
  className: "gz-panel-close",
}))`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 600;
  padding: 0;
  width: 3rem;
  height: 3rem;
  font-size: 1rem;
  background-color: var(--dark-grey-5);
  color: white;
  outline: none;
  border: none;
  border-radius: 100%;
  opacity: 0.8;
  cursor: pointer;

  backface-visibility: hidden;

  transition: all 100ms ease;

  &:hover {
    opacity: 1;
  }
`;

const StreamContainer = styled.div.attrs((props) => ({
  className: "gz-panel-stream-container",
}))`
  margin: 2rem 3rem 0 3rem;
`;

type PanelProps = {
  banner: BannerProps;
  generator: (index: number) => React.Node | React.Node[];
};

const Panel: React.FC<PanelProps> = (props) => {
  const setModal = useContext(ModalContext);

  return (
    <Container onClick={(event) => event.stopPropagation()}>
      <CloseContainer onClick={() => setModal(null)}>
        <FontAwesomeIcon icon={faTimes} size="2x" />
      </CloseContainer>
      <Scroll hidden={true}>
        <Banner {...props.banner} />
        <StreamContainer>
          <Stream generator={props.generator} />
        </StreamContainer>
      </Scroll>
    </Container>
  );
};

export { PanelProps };
export default Panel;
