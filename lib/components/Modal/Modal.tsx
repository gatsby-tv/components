import React, { createContext, useContext, useEffect } from "react";

import { Container } from "./Styles";

export interface ModalProvider {
  (node: React.Node): void;
}

export const ModalContext = createContext((node: React.Node) => undefined);

export interface ModalProps {
  children: React.Node;
}

export const Modal: React.FC<ModalProps> = (props) => {
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
    <Container onClick={(event) => setModal(null)}>{props.children}</Container>
  );
};
