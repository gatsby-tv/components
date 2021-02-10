import React from "react";

import { Item, ItemProps } from "../Item";

export interface TimeProps extends ItemProps {
  children?: React.ReactNode;
  date: Date;
}

export function Time(props: TimeProps): React.ReactElement {
  const { children, date, ...rest } = props;

  return (
    <Item as="time" dateTime={date.toISOString()} {...rest}>
      {children}
    </Item>
  );
}
