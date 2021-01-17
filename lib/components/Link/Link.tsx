import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

export interface LinkProps {
  href?: string;
  className?: string;
  children?: React.ReactNode;
  underline?: boolean;
  external?: boolean;
  onClick?: () => void;
}

const cssUnderline = css`
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: currentcolor;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: transform ${(props) => props.theme.duration.faster} ease;
  }

  &:hover:after {
    transform: scaleX(1);
  }
`;

const LinkBase = styled.a<LinkProps>`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  ${(props) => ifExists(props.underline, cssUnderline)}
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (props: LinkProps, ref) => {
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
        underline={props.underline}
      >
        {props.children}
      </LinkBase>
    );
  }
);

Link.displayName = "Link";
