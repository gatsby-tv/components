import React from "react";
import styled from "styled-components";

import { useNavigation, ifExists } from "@lib/utilities";
import { Subheading, Flex } from "@lib/components";

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  flush?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props) => {
  const { column } = useNavigation();

  return (
    <Flex
      as="ul"
      $fill
      className={props.className}
      column={ifExists(column)}
      align="stretch"
      data-flush={ifExists(props.flush)}
    >
      {column && props.title && <Subheading>{props.title}</Subheading>}
      {props.children}
    </Flex>
  );
};

export const Section = styled(
  Object.assign(SectionBase, { Title: Subheading })
)``;
