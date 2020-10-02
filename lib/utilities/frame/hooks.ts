import { useContext } from "react";

import { FrameContext } from "./context";

export const useFrame = () => {
  const frame = useContext(FrameContext);

  if (!frame) {
    throw new Error("No Frame context provided for component.");
  }

  return frame;
};
