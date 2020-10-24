import React, { createContext } from "react";

import { EventHandler } from "@lib/types";

export interface ScrollContextType {
  (callback: EventHandler): void;
}

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);
