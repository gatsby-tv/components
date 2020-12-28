import React, { useState, useCallback } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { AppContext } from "@lib/utilities/app";
import { DarkTheme, LightTheme } from "@lib/styles/theme";

import { Global } from "./components";

export interface AppProviderProps {
  children?: React.ReactNode;
  $theme?: "dark" | "light";
}

export function AppProvider(props: AppProviderProps) {
  const theme: DefaultTheme = props.$theme === "light" ? LightTheme : DarkTheme;
  const [loadingSemaphore, setLoadingSemaphore] = useState(0);

  const startLoading = useCallback(
    () => setLoadingSemaphore((value) => value + 1),
    []
  );
  const stopLoading = useCallback(
    () => setLoadingSemaphore((value) => Math.max(0, value - 1)),
    []
  );

  const context = {
    startLoading,
    stopLoading,
    isLoading: loadingSemaphore !== 0,
  };

  return (
    <AppContext.Provider value={context}>
      <ThemeProvider theme={theme}>
        <Global />
        {props.children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
