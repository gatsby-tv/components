import styled from "styled-components";

export const Container = styled.div.attrs((props) => ({
  className: "gz-scroll",
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`;
