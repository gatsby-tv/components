import { createContext } from "react";

export interface NavigationContextType {
  selection: Record<string, boolean>;
  onSelect: (id: string) => void;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);
