import React, { createContext, useContext, useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div.attrs((props) => ({
  className: "gz-modal",
}))`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  background-color: var(--overlay-contrast);

  @keyframes fadein {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  animation-name: fadein;
  animation-timing-function: ease;
  animation-duration: 400ms;
  animation-fill-mode: forwards;
`;

const ModalContext = createContext((node: React.Node) => null);

type ModalProps = {
  children: React.Node;
};

const Modal: React.FC<ModalProps> = (props) => {
  const setModal = useContext(ModalContext);

  useEffect(() => {
    const handleKeypress = (event) => {
      if (event.keyCode === 27) {
        setModal(null);
      }
    };

    window.addEventListener("keydown", handleKeypress);
    return () => window.removeEventListener("keydown", handleKeypress);
  }, []);

  return (
    <Overlay onClick={(event) => setModal(null)}>{props.children}</Overlay>
  );
};

export { ModalProps, ModalContext };
export default Modal;
