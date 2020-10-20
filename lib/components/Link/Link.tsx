import React from "react";
import styled, { css, CSSProp } from "styled-components";

export interface LinkProps {
  url: string;
  className?: string;
  children?: React.ReactNode;
  external?: boolean;
}

const LinkBase = styled.a`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  outline: none;
`;

export const Link: React.FC<LinkProps> = (props) => {
  const target = props.external ? "_blank" : undefined;
  const rel = props.external ? "noopener noreferrer" : undefined;

  return (
    <LinkBase
      target={target}
      rel={rel}
      href={props.url}
      className={props.className}
    >
      {props.children}
    </LinkBase>
  );
};
