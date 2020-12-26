import React, { useRef, useState, useEffect } from "react";

import {
  List,
  ListProps,
  Item,
  ItemProps,
  Link,
  LinkProps,
  ItemTooltip,
} from "./components";

export type { ListProps as TextMetaListProps };
export type { LinkProps as TextMetaLinkProps };

export interface TextMetaProps extends ItemProps {
  children?: string | [string];
  tooltip?: boolean;
}

function TextMetaBase(props: TextMetaProps) {
  const text = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(false);

  return (
    <>
      <Item
        ref={text}
        size={props.size}
        clamp={props.clamp}
        bold={props.bold}
        subdued={props.subdued}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {props.children}
      </Item>
      <ItemTooltip $for={text} active={props.tooltip && active}>
        {props.children}
      </ItemTooltip>
    </>
  );
}

export const TextMeta = Object.assign(TextMetaBase, { List, Link });
