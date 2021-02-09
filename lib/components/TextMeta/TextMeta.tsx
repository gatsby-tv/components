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
export type { ItemProps as TextMetaProps };

export const TextMeta = Object.assign(Item, { List, Link });
