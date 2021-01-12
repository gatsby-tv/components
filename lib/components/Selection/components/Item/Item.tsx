import React from "react";
import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { useSelection } from "@lib/utilities/selection";
import { Flex } from "@lib/components/Flex";

export interface ItemProps {
  children?: React.ReactNode;
  id: string;
  className?: string;
}

const ItemBase: React.FC<ItemProps> = (props: ItemProps) => {
  const { selection, onSelect } = useSelection();
  const handleClick = () => onSelect(props.id);

  return (
    <Flex.Item
      as="li"
      className={props.className}
      data-selected={ifExists(selection[props.id])}
      grow={1}
      onClick={handleClick}
    >
      {props.children}
    </Flex.Item>
  );
};

export const Item = styled(ItemBase)``;
