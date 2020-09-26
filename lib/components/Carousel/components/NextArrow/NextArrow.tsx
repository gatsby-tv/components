import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import * from "./Styles"

export interface NextArrowProps {
  onClick(): void;
}

export const NextArrow: React.FC<NextArrowProps> = (props) => (
  <Container onClick={props.onClick}>
    <FontAwesomeIcon size="3x" icon={faChevronRight} />
  </Container>
)
