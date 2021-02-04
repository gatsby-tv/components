import React, { useRef, useState } from "react";

import {
  List,
  ListProps,
  Item,
  ItemProps,
  Link,
  LinkProps,
} from "./components";

export type { ListProps as TextMetaListProps };
export type { LinkProps as TextMetaLinkProps };

export interface TextMetaProps extends ItemProps {
  children?: React.ReactNode;
  tooltip?: boolean;
}

function TextMetaBase(props: TextMetaProps) {
  const { children, tooltip, ...itemProps } = props;
  const text = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);

  return (
    <Item
      ref={text}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      {...itemProps}
    >
      {children}
    </Item>
  );
}

export const TextMeta = Object.assign(TextMetaBase, { List, Link });
