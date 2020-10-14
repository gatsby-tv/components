import React from "react";
import styled, { css, CSSProp } from "styled-components";

export interface UnstyledLinkProps {
  url: string;
  children?: React.ReactNode;
  external?: boolean;
  $css?: CSSProp;
}

const UnstyledLinkBase = styled.a`
  color: inherit;
  text-decoration: none;
  outline: none;
`;

export const UnstyledLink: React.FC<UnstyledLinkProps> = (props) => {
  const target = props.external ? "_blank" : undefined;
  const rel = props.external ? "noopener noreferrer" : undefined;

  return (
    <UnstyledLinkBase
      target={target}
      rel={rel}
      href={props.url}
      css={props.$css}
    >
      {props.children}
    </UnstyledLinkBase>
  );
};
