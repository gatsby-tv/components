import styled from "styled-components";

export const Small = styled.div.attrs((props) => ({
  className: "gz-display-text-small",
}))`
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 400;
  font-stretch: normal;
`;

export const Medium = styled.div.attrs((props) => ({
  className: "gz-display-text-medium"
}))`
  font-size: 1.6rem;
  line-height: 2rem;
  font-weight: 500;
  font-stretch: semi-condensed;
`

export const Large = styled.div.attrs((props) => ({
  className: "gz-display-text-large"
}))`
  font-size: 2.4rem;
  line-height: 3.2rem;
  font-weight: 500;
  font-stretch: semi-condensed;
`

export const ExtraLarge = styled.div.attrs((props) => ({
  className: "gz-display-text-x-large"
}))`
  font-size: 3.6rem;
  line-height: 4.8rem;
  font-weight: 600;
  font-stretch: semi-condensed;
`
