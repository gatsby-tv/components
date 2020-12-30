import React, { useState, useCallback } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";
import { UniqueIdContext, useUniqueIdGenerator } from "@gatsby-tv/utilities";

import { AppContext } from "@lib/utilities/app";
import { DarkTheme, LightTheme } from "@lib/styles/theme";

import { Global } from "./components";

export interface AppProviderProps {
  children?: React.ReactNode;
  $theme?: "dark" | "light";
}

export function AppProvider(props: AppProviderProps): React.ReactElement {
  const theme: DefaultTheme = props.$theme === "light" ? LightTheme : DarkTheme;
  const uniqueIdGenerator = useUniqueIdGenerator();
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
      <UniqueIdContext.Provider value={uniqueIdGenerator}>
        <ThemeProvider theme={theme}>
          <Global />
          {props.children}
        </ThemeProvider>
      </UniqueIdContext.Provider>
    </AppContext.Provider>
  );
}
