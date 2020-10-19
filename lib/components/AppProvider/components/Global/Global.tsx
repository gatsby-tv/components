import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    font-family: inherit;
  }

  :root {
    font-size: 10px;
  }

  body {
    color: ${(props) => props.theme.colors.font.body};
    font-family: "Nunito Sans", "Noto Sans", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  }
`;
