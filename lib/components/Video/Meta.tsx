import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Link = styled.a`
  width: fit-content;

  cursor: pointer;
  color: inherit;
  text-decoration: none;
  z-index: 2;

  &:hover * {
    color: var(--font-color);
  }
`;

const Title = styled.h3`
  font-stretch: semi-condensed;
  font-weight: 600;
  font-size: 1.6rem;
  margin: 0 0 0.4rem 0;
`;

const Info = styled.span`
  font-stretch: semi-condensed;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--font-grey-1);
`;

type MetaProps = {
  title: string;
  subtitle: string | null;
  info: string[];
};

const Meta: React.FC<MetaProps> = (props) => {
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

export default Meta;
export { MetaProps };
