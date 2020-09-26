import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { Container } from "./Styles";

export interface CloseButtonProps {
  onClick(): void;
}

export const CloseButton: React.FC<CloseButtonProps> = (props) => (
  <Container onClick={props.onClick}>
    <FontAwesomeIcon icon={faTimes} size="2x" />
  </Container>
);
