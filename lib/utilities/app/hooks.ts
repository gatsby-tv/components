import { useContext } from "react";

import { AppContext } from "./context";

export const useApp = () => {
  const app = useContext(AppContext);

  if (!app) {
    throw new Error("No App context provided for component.");
  }

  return app;
};
