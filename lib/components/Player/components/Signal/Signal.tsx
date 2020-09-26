import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Container } from "./Styles";

export interface SignalProps {
  icon: any;
}

export const Signal: React.FC<SignalProps> = (props) => (
  <Container>
    <FontAwesomeIcon {...props} />
  </Container>
);
