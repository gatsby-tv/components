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
  const { children, id, className } = props;
  const { selection, onSelect } = useSelection();
  const handleClick = () => onSelect(props.id);

  const itemProps = {
    className,
    "data-selected": ifExists(selection[id]),
    grow: 1,
    onClick: handleClick,
  };

  return (
    <Flex.Item as="li" {...itemProps}>
      {children}
    </Flex.Item>
  );
};

export const Item = styled(ItemBase)``;
