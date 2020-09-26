import React from "react";

import { Container, Link, Title, Info } from "./Styles";

export interface MetaProps {
  title: string;
  subtitle?: string;
  info: string[];
}

export const Meta: React.FC<MetaProps> = (props) => {
  const info = props.info
    .map((value, index) => [
      <Info key={index}>{value}</Info>,
      <Info key={`${index}/dot`}>•</Info>,
    ])
    .flat()
    .slice(0, -1);

  return (
    <>
      <Title>{props.title}</Title>
      {props.subtitle && (
        <Link>
          <Info>{props.subtitle}</Info>
        </Link>
      )}
      <Container>{info}</Container>
    </>
  );
};
