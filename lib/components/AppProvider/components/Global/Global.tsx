import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
  }

  :root {
    font-size: 10px;
  }

  body {
    color: ${(props) => props.theme.colors.font.base};
    font-family: "Noto Sans", "Fira Sans", "Droid Sans", "Helvetica Neue", "sans-serif";
  }
`;
