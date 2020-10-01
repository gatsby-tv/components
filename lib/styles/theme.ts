import { DefaultTheme } from "styled-components";

export const DarkTheme: DefaultTheme = {
  colors: {
    white: {
      base: "white",
    },
    black: {
      base: "black",
    },
    placeholder: {
      base: "rgba(255, 255, 255, 0.1)",
    },
    gatsbyGold: {
      base: "#b29b5c",
      light: "#bdaa74",
      dark: "#97844e",
    },
    background: {
      base: "#141414",
      0: "#1a1a1a",
      1: "#202020",
      2: "#262626",
      3: "#2c2c2c",
      4: "#313131",
    },
    font: {
      base: "rgba(255, 255, 255, 0.9)",
      subdued: "rgba(255, 255, 255, 0.6)",
      inverted: "rgba(0, 0, 0, 0.9)",
    },
    shadow: {
      base: "rgba(0, 0, 0, 0.9)",
      light: "rgba(100, 100, 100, 0.9)",
    },
  },
};

export const LightTheme: DefaultTheme = DarkTheme;
