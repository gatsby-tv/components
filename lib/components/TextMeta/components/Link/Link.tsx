import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
} from "react";
import styled from "styled-components";

import { MetaSize } from "@lib/types";
import { cssTextSubdued } from "@lib/styles/typography";
import { EventListener } from "@lib/components/EventListener";
import {
  Link as UnstyledLink,
  LinkProps as UnstyledLinkProps,
} from "@lib/components/Link";

import { Item } from "../Item";

interface LinkBaseProps {
  $size?: MetaSize;
  $bold?: boolean;
}

const LinkBase = styled(Item)<LinkBaseProps>`
  ${cssTextSubdued}
  transition: color ${(props) => props.theme.duration.fastest} ease;
  width: fit-content;

  &:hover {
    color: ${(props) => props.theme.colors.font.body};
  }
`;

export interface LinkProps extends UnstyledLinkProps {
  children?: string | [string];
  href?: string;
  $external?: boolean;
  $size?: MetaSize;
  $bold?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const text = useRef<HTMLParagraphElement>(null);
    const [truncated, setTruncated] = useState(false);
    const [active, setActive] = useState(false);
    const { $size, $bold, ...rest } = props;

    const handleResize = useCallback(() => {
      if (!text.current) return;
      setTruncated(text.current.offsetWidth < text.current.scrollWidth);
    }, []);

    useEffect(() => handleResize(), [handleResize]);

    return (
      <>
        <LinkBase
          ref={text}
          $size={$size}
          $bold={$bold}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          <UnstyledLink
            ref={ref as React.RefObject<HTMLAnchorElement>}
            {...rest}
          />
        </LinkBase>
        <EventListener $event="resize" $handler={handleResize} />
      </>
    );
  }
);

Link.displayName = "Link";
