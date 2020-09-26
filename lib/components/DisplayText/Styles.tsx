import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-display-text",
}))`
  font-size: ${(props) => props.size};
`;
