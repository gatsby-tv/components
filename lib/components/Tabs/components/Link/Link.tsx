import React, { forwardRef } from "react";

import {
  Link as LinkBase,
  LinkProps as LinkBaseProps,
} from "@lib/components/Link";
import { Flex } from "@lib/components/Flex";
import { Selection, SelectionItemProps } from "@lib/components/Selection";

export type LinkProps = LinkBaseProps & SelectionItemProps;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const { children, id, className, ...linkProps } = props;

    return (
      <Selection.Item id={id} className={className}>
        <LinkBase ref={ref} {...linkProps}>
          <Flex expand center>
            {children}
          </Flex>
        </LinkBase>
      </Selection.Item>
    );
  }
);

Link.displayName = "Link";
