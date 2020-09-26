import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import * from "./Styles"

export interface BackArrowProps {
  onClick(): void;
}

export const BackArrow: React.FC<BackArrowProps> = (props) => (
  <Container onClick={props.onClick}>
    <FontAwesomeIcon size="3x" icon={faChevronLeft} />
  </Container>
)
