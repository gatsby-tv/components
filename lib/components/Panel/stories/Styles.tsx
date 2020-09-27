import styled from "styled-components";

export const Card = styled.div.attrs((props) => ({
  className: "sb--gz-panel-card",
}))`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background: white;
`;
