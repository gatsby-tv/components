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
  const text = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);

  return (
    <Item
      ref={text}
      font={props.font}
      clamp={props.clamp}
      bold={props.bold}
      subdued={props.subdued}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {props.children}
    </Item>
  );
}

export const TextMeta = Object.assign(TextMetaBase, { List, Link });
