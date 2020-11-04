import { useContext } from "react";

import { SelectionContext } from "./context";

export const useSelection = () => {
  const selection = useContext(SelectionContext);

  if (!selection) {
    throw new Error("No Selection context provided for component.");
  }

  return selection;
};
