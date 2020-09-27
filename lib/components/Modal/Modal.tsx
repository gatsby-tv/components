import React, { createContext, useContext, useEffect } from "react";

import { Container } from "./Styles";

export interface ModalProvider {
  (node: React.ReactNode): void;
}

export const ModalContext = createContext((node: React.ReactNode) => undefined);

export interface ModalProps {
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = (props) => {
  const setModal = useContext(ModalContext);

  useEffect(() => {
    const handleKeypress = (event: React.KeyboardEvent) => {
      if (event.keyCode === 27) {
        setModal(null);
      }
    };

    window.addEventListener("keydown", handleKeypress as any);
    return () => window.removeEventListener("keydown", handleKeypress as any);
  }, []);

  return (
    <Container onClick={(event) => setModal(null)}>{props.children}</Container>
  );
};
