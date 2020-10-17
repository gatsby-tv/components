import { useContext } from "react";

import { ConnectedContext } from "./context";

export const useConnected = () => {
  return useContext(ConnectedContext);
};
