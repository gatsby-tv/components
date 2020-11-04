import React from "react";
import styled from "styled-components";

import { useSelection } from "@lib/utilities/selection";
import { ifExists } from "@lib/utilities/if-exists";
import { Flex } from "@lib/components/Flex";
import { TextSubheading } from "@lib/components/TextSubheading";

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
  title?: React.ReactNode;
  flush?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props) => {
  const { column } = useSelection();

  return (
    <Flex
      as="ul"
      $fill
      className={props.className}
      column={ifExists(column)}
      align="stretch"
      data-flush={ifExists(props.flush)}
    >
      {column && props.title && <TextSubheading>{props.title}</TextSubheading>}
      {props.children}
    </Flex>
  );
};

export const Section = styled(
  Object.assign(SectionBase, { Title: TextSubheading })
)``;
