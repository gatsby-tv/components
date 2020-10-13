import { useContext } from "react";

import { NavigationContext } from "./context";

export const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  if (!navigation) {
    throw new Error("No Navigation context provided for component.");
  }

  return navigation;
};
