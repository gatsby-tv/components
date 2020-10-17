import React from "react";
import styled from "styled-components";

import { Subheading, Flex } from "@app/components";

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  flush?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props) => {
  return (
    <Flex
      as="ul"
      className={props.className}
      column
      align="stretch"
      data-flush={props.flush}
    >
      {props.title && <Subheading>{props.title}</Subheading>}
      {props.children}
    </Flex>
  );
};

export const Section = styled(
  Object.assign(SectionBase, { Title: Subheading })
)``;
