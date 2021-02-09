import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  forwardRef,
} from "react";
import styled from "styled-components";

import { cssTextSubdued } from "@lib/styles/typography";
import { EventListener } from "@lib/components/EventListener";
import {
  Link as UnstyledLink,
  LinkProps as UnstyledLinkProps,
} from "@lib/components/Link";

import { Item } from "../Item";

interface LinkBaseProps {
  font?: string;
  bold?: boolean;
  heading?: boolean;
}

const LinkBase = styled(Item)<LinkBaseProps>`
  ${cssTextSubdued}
  transition: color ${(props) => props.theme.duration.fastest} ease;
  width: fit-content;

  &:hover {
    color: ${(props) => props.theme.colors.font.body.toString()};
  }
`;

export interface LinkProps extends UnstyledLinkProps {
  children?: string | [string];
  href?: string;
  external?: boolean;
  font?: string;
  bold?: boolean;
  heading?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
    const text = useRef<HTMLParagraphElement>(null);
    const [, setTruncated] = useState(false);
    const [, setActive] = useState(false);
    const { font, bold, heading, ...rest } = props;

    const handleResize = useCallback(() => {
      if (!text.current) return;
      setTruncated(text.current.offsetWidth < text.current.scrollWidth);
    }, []);

    useEffect(() => handleResize(), [handleResize]);

    const textProps = {
      ref: text,
      font,
      bold,
      heading,
      onMouseEnter: () => setActive(true),
      onMouseLeave: () => setActive(false),
    };

    const linkProps = {
      ref: ref as React.RefObject<HTMLAnchorElement>,
      ...rest,
    };

    return (
      <>
        <LinkBase {...textProps}>
          <UnstyledLink {...linkProps} />
        </LinkBase>
        <EventListener event="resize" handler={handleResize} />
      </>
    );
  }
);

Link.displayName = "Link";
