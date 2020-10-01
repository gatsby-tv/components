import "styled-components";

interface Value {
  base: string;
  [key: number]: string;
  [key: string]: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      [key: string]: Value;
      white: Value;
      black: Value;
      placeholder: Value;
      gatsbyGold: Value;
      background: Value;
      font: Value;
    };
  }
}
