import React from "react";

import { Subheading, Flex } from "@app/components";

export interface SectionProps {
  children?: React.ReactNode;
  title?: React.ReactNode;
  flush?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props) => {
  return (
    <Flex as="ul" column align="stretch" data-flush={props.flush}>
      {props.title && <Subheading>{props.title}</Subheading>}
      {props.children}
    </Flex>
  );
};

export const Section = Object.assign(SectionBase, { Title: Subheading })
