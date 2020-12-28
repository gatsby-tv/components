import React from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { useSelection } from "@lib/utilities/selection";
import { Flex } from "@lib/components/Flex";
import { TextSubheading } from "@lib/components/TextSubheading";

export interface SectionProps {
  children?: React.ReactNode;
  className?: string;
  $title?: React.ReactNode;
  $flush?: boolean;
}

const SectionBase: React.FC<SectionProps> = (props) => {
  const { column } = useSelection();

  return (
    <Flex
      as="ul"
      className={props.className}
      data-flush={ifExists(props.$flush)}
      $fill
      $column={ifExists(column)}
      $align="stretch"
    >
      {column && props.$title && (
        <TextSubheading>{props.$title}</TextSubheading>
      )}
      {props.children}
    </Flex>
  );
};

export const Section = styled(
  Object.assign(SectionBase, { Title: TextSubheading })
)``;
