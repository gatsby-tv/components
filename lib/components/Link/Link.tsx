import React, { forwardRef } from "react";
import styled, { css, CSSProp } from "styled-components";

export interface LinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}

const LinkBase = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const target = props.external ? "_blank" : undefined;
  const rel = props.external ? "noopener noreferrer" : undefined;

  return (
    <LinkBase
      ref={ref as React.RefObject<HTMLAnchorElement>}
      target={target}
      rel={rel}
      href={props.href}
      onClick={props.onClick}
      className={props.className}
    >
      {props.children}
    </LinkBase>
  );
});
