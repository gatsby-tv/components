import { createContext } from "react";

export interface FrameContextType {
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}

export const FrameContext = createContext<FrameContextType | undefined>(
  undefined
);
