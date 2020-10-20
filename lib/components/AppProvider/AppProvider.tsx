import React from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { DarkTheme, LightTheme } from "@lib/styles";
import { Global } from "./components";

export interface AppProviderProps {
  children?: React.ReactNode;
  theme?: "dark" | "light";
}

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const theme: DefaultTheme = props.theme === "light" ? LightTheme : DarkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Global />
      {props.children}
    </ThemeProvider>
  );
};
