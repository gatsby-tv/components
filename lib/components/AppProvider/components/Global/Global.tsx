import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: none;
    font: inherit;
    font-size: 100%;
    line-height: inherit;
    vertical-align: baseline;
  }

  :root {
    font-size: 62.5%;
    text-size-adjust: 100%;
    background-color: ${(props) => props.theme.colors.background[0]};
  }

  body {
    color: ${(props) => props.theme.colors.font.body};
    overflow: hidden;
    font-family: "Inter", "Nunito Sans", "Noto Sans", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: ${(props) => props.theme.font[5]};
    line-height: ${(props) => props.theme.lineHeight.body};
  }
`;
