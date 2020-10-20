import React, { useEffect, useRef } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { DarkTheme, LightTheme } from "@lib/styles";
import { Global } from "./components";

export interface AppProviderProps {
  children?: React.ReactNode;
  theme?: "dark" | "light";
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const mounted = useRef(false);
  const theme: DefaultTheme = props.theme === "light" ? LightTheme : DarkTheme;

  useEffect(() => {
    if (typeof window === "undefined" || mounted.current) return;
    mounted.current = true;

    const WebFont = require("webfontloader");

    WebFont.load({
      google: {
        families: ["Inter:100,200,300,400,500,600,700,800,900"],
      },
    });
  });

  return (
    <ThemeProvider theme={theme}>
      <Global />
      {props.children}
    </ThemeProvider>
  );
};
