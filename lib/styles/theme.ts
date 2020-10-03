import { DefaultTheme } from "styled-components";
import Color from "color";

export const DarkTheme: DefaultTheme = {
  colors: {
    font: {
      body: Color.rgb(255, 255, 255, 0.9),
      subdued: Color.rgb(255, 255, 255, 0.6),
      inverted: Color.rgb(0, 0, 0, 0.9),
    },
    background: {
      0: Color("#141414"),
      1: Color("#1a1a1a"),
      2: Color("#202020"),
      3: Color("#262626"),
      4: Color("#2c2c2c"),
      5: Color("#313131"),
    },
    shadow: {
      dark: Color.rgb(0, 0, 0, 0.9),
      light: Color.rgb(100, 100, 100, 0.9),
    },
    placeholder: Color.rgb(255, 255, 255, 0.1),
    error: Color("#de0017"),
    gold: Color("#b29b5c"),
    blue: Color("#6495ed"),
    pink: Color("#ed6495"),
    green: Color("#00853e"),
    white: Color("#fff"),
    black: Color("#111"),
  },
  font: {
    size: {
      heading: "17px",
      subheading: "13px",
      extraSmall: "8px",
      small: "11px",
      base: "15px",
      large: "24px",
      extraLarge: "32px",
    },
    height: {
      heading: "19px",
      subheading: "15px",
      extraSmall: "10px",
      small: "13px",
      base: "17px",
      large: "28px",
      extraLarge: "40px",
    },
  },
  border: {
    radius: {
      none: "0",
      smallest: "2px",
      small: "4px",
      base: "6px",
      large: "8px",
      largest: "10px",
      full: "100%",
    },
    width: {
      none: "0",
      smallest: "1px",
      small: "2px",
      base: "3px",
      large: "4px",
      largest: "5px",
    },
  },
  spacing: {
    none: "0",
    extraTight: "4px",
    tight: "8px",
    baseTight: "12px",
    base: "16px",
    loose: "20px",
    extraLoose: "32px",
  },
  duration: {
    instant: "0",
    fastest: "100ms",
    faster: "200ms",
    fast: "300ms",
    base: "500ms",
    slow: "700ms",
    slower: "1s",
    slowest: "2s",
  },
};

export const LightTheme: DefaultTheme = DarkTheme;
