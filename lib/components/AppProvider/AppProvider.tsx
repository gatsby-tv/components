import React, { useEffect } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import WebFont from "webfontloader";

import { DarkTheme, LightTheme } from "@lib/styles";
import { Global } from "./components";

export interface AppProviderProps {
  children?: React.ReactNode;
  theme?: "dark" | "light";
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const theme: DefaultTheme = props.theme === "light" ? LightTheme : DarkTheme;

  useEffect(
    () =>
      WebFont.load({
        google: {
          families: ["Inter:100,200,300,400,500,600,700,800,900"],
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme}>
      <Global />
      {props.children}
    </ThemeProvider>
  );
};
