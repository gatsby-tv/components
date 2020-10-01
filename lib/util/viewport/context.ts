import { createContext, RefObject } from "react";

import { EventHandler } from "../../types";

export interface ViewportContextType {
  viewport: RefObject<HTMLElement> | null;
  video: RefObject<HTMLVideoElement> | null;
  handlers: EventHandler[];
  addHandler: (handler: EventHandler) => void;
}

export const ViewportContext = createContext<ViewportContextType | undefined>(
  undefined
);
