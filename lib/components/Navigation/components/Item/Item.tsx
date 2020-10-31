import React from "react";
import styled from "styled-components";

import { useNavigation } from "@lib/utilities/navigation";
import { ifExists } from "@lib/utilities/if-exists";
import { Flex } from "@lib/components/Flex";

export interface ItemProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ItemBase: React.FC<ItemProps> = (props) => {
  const { selection, onSelect } = useNavigation();
  const handleClick = () => onSelect(props.id);

  return (
    <Flex.Item
      as="li"
      className={props.className}
      grow={1}
      data-selected={ifExists(selection[props.id])}
      onClick={handleClick}
    >
      {props.children}
    </Flex.Item>
  );
};

export const Item = styled(ItemBase)``;
