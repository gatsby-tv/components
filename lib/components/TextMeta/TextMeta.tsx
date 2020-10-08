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
}

const TextMetaBase: React.FC<TextMetaProps> = (props) => {
  const text = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!text.current) return;
    setTruncated(text.current.offsetWidth < text.current.scrollWidth);
  });

  return (
    <>
      <Item
        ref={text}
        size={props.size}
        bold={props.bold}
        subdued={props.subdued}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {props.children}
      </Item>
      <ItemTooltip $for={text} active={truncated && active}>
        {props.children}
      </ItemTooltip>
    </>
  );
};

export const TextMeta = Object.assign(TextMetaBase, { List, Link });
