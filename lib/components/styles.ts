import styled from "styled-components";
import * as colors from "./colors";

const Global = styled.div`
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${colors.background};
  color: white;
`;

const Form = styled(Global)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  gap: 10px;
  input, textarea, select {
    padding: 5px;
    border: none;
    border-radius: 5px;
    background-color: ${colors.backgroundHighlight};
    color: white;
    font-family: inherit;
    font-size: inherit;
  }
`;

export { Global, Form };