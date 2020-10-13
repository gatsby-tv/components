import React from "react";

import { useNavigation, ifExists } from "@app/utilities";
import { Styleable } from "@app/types";
import { Flex } from "@app/components";

export interface ItemProps extends Styleable {
  $id: string;
  children?: React.ReactNode;
}

export const Item: React.FC<ItemProps> = (props) => {
  const { selection, onSelect } = useNavigation();
  const handleClick = () => onSelect(props.$id);

  return (
    <Flex.Item
      as="li"
      id={props.$id}
      grow={1}
      data-selected={ifExists(selection[props.$id])}
      css={props.css}
      style={props.style}
      onClick={handleClick}
    >
      {props.children}
    </Flex.Item>
  );
};
