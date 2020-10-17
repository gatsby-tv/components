import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

import { MetaSize } from "@lib/types";
import { cssTextSubdued } from "@lib/styles";
import { UnstyledLink, UnstyledLinkProps } from "@lib/components";

import { Item } from "../Item";
import { ItemTooltip } from "../ItemTooltip";

interface LinkBaseProps {
  size?: MetaSize;
}

const LinkBase = styled(Item)<LinkBaseProps>`
  ${cssTextSubdued}
  cursor: pointer;
  transition: color ${(props) => props.theme.duration.fastest} ease;
  width: fit-content;

  &:hover {
    color: ${(props) => props.theme.colors.font.body};
  }
`;

export interface LinkProps extends UnstyledLinkProps {
  children?: string | [string];
  size?: MetaSize;
}

export const Link: React.FC<LinkProps> = (props) => {
  const text = useRef<HTMLParagraphElement>(null);
  const [truncated, setTruncated] = useState(false);
  const [active, setActive] = useState(false);
  const { size, ...rest } = props;

  useEffect(() => {
    if (!text.current) return;
    setTruncated(text.current.offsetWidth < text.current.scrollWidth);
  });

  return (
    <>
      <LinkBase
        ref={text}
        size={size}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
      >
        <UnstyledLink {...rest} />
      </LinkBase>
      <ItemTooltip $for={text} active={truncated && active}>
        {props.children}
      </ItemTooltip>
    </>
  );
};
