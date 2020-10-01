import { useContext } from "react";

import { ViewportContext } from "./context";

export const useViewport = () => {
  const viewport = useContext(ViewportContext);

  if (!viewport) {
    throw new Error("No Viewport context provided for component");
  }

  return viewport;
};
