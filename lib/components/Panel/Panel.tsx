import React, { useContext } from "react";

import { ModalContext } from "../Modal";
import { Scroll } from "../Scroll";

import { CloseButton } from "./components";

import { Container, Wrapper } from "./Styles";

export interface PanelProps {
  children?: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const setModal = useContext(ModalContext);

  return (
    <Wrapper>
      <Container onClick={(event) => event.stopPropagation()}>
        {setModal && <CloseButton onClick={() => setModal(null)} />}
        <Scroll hidden>{props.children}</Scroll>
      </Container>
    </Wrapper>
  );
};
