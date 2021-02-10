import {
  List,
  ListProps,
  Item,
  ItemProps,
  Link,
  LinkProps,
  Time,
  TimeProps,
} from "./components";

export type { ListProps as TextMetaListProps };
export type { LinkProps as TextMetaLinkProps };
export type { TimeProps as TextMetaTimeProps };
export type { ItemProps as TextMetaProps };

export const TextMeta = Object.assign(Item, { List, Link, Time });
