import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { MetaSize } from "@app/types";
import { cssTextSubdued } from "@app/styles";

import { Item } from "../Item";
import { ItemTooltip } from "../ItemTooltip";

interface LinkBaseProps {
  size?: MetaSize;
}

const LinkBase = styled(Item)<LinkBaseProps>`
  ${cssTextSubdued}
  cursor: pointer;
  transition: color ${(props) => props.theme.duration.fastest} ease;
  text-decoration: none;

  &:hover {
    color: ${(props) => props.theme.colors.font.body};
  }
`;

export interface LinkProps extends LinkBaseProps {
  children?: string | [string];
  href?: string;
}

export const Link: React.FC<LinkProps> = (props) => {
  const text = useRef<HTMLAnchorElement>(null);
  const [truncated, setTruncated] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!text.current) return;
    setTruncated(text.current.offsetWidth < text.current.scrollWidth);
  });

  return (
    <>
      <LinkBase
        as="a"
        ref={text}
        href={props.href}
        size={props.size}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        {props.children}
      </LinkBase>
      <ItemTooltip $for={text} active={truncated && active}>
        {props.children}
      </ItemTooltip>
    </>
  );
};
