import React from "react";

import { Box } from "@app/components";
import { LabelText, HelpText } from "./components";

export interface LabelledProps {
  id: string;
  label: string;
  help?: string;
  hidden?: boolean;
  children?: React.ReactNode;
}

export const Labelled: React.FC<LabelledProps> = (props) => {
  const helpMarkup = props.help ? <HelpText>{props.help}</HelpText> : null;

  return (
    <Box>
      <LabelText as="label" htmlFor={props.id}>
        {props.label}
      </LabelText>
      {props.children}
      {helpMarkup}
    </Box>
  );
};
