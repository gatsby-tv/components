import React from "react";
import styled, { css } from "styled-components";

import { useSwitch, ifExists } from "@app/utilities";
import { Flex } from "@app/components";

export interface ItemProps {
  id: string;
  className?: string;
  children?: React.ReactNode;
}

const ItemBase: React.FC<ItemProps> = (props) => {
  const { selection, onSelect } = useSwitch();
  const handleClick = () => onSelect(props.id);

  return (
    <Flex.Item
      className={props.className}
      grow={1}
      data-selected={ifExists(selection[props.id])}
      onClick={handleClick}
    >
      <Flex center>{props.children}</Flex>
    </Flex.Item>
  );
};

export const Item = styled(ItemBase)``;
