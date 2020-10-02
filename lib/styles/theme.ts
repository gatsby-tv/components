import { DefaultTheme } from "styled-components";

export const DarkTheme: DefaultTheme = {
  colors: {
    font: {
      body: "rgba(255, 255, 255, 0.9)",
      subdued: "rgba(255, 255, 255, 0.6)",
      inverted: "rgba(0, 0, 0, 0.9)",
    },
    background: {
      0: "#141414",
      1: "#1a1a1a",
      2: "#202020",
      3: "#262626",
      4: "#2c2c2c",
      5: "#313131",
    },
    shadow: {
      dark: "rgba(0, 0, 0, 0.9)",
      light: "rgba(100, 100, 100, 0.9)",
    },
    placeholder: "rgba(255, 255, 255, 0.1)",
    gold: "#b29b5c",
    blue: "#6495ed",
    pink: "#ed6495",
    green: "#00853e",
    white: "white",
    black: "#111",
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
