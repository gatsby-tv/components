import { useContext } from "react";

import { SwitchContext } from "./context";

export const useSwitch = () => {
  const context = useContext(SwitchContext);

  if (!context) {
    throw new Error("No Switch context provided for component.");
  }

  return context;
};
