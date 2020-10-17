import { createContext } from "react";

export type ConnectedContextType = boolean;

export const ConnectedContext = createContext<ConnectedContextType | undefined>(
  undefined
);
