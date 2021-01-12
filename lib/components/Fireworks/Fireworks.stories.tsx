import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useToggle } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { FormButton } from "@lib/components/FormButton";

import { Fireworks, FireworksProps } from "./Fireworks";

export default {
  title: "Fireworks",
  component: Fireworks,
} as Meta;

export const Infinite: Story<FireworksProps> = () => {
  const origin = () => ({
    x: (Math.random() * window.innerWidth * 2) / 3 + window.innerWidth / 6,
    y: window.innerHeight,
  });

  return (
    <AppProvider theme="dark">
      <Fireworks origin={origin} count={Infinity} interval={800} />
    </AppProvider>
  );
};

export const WithButton: Story<FireworksProps> = () => {
  const { toggle, flipToggle } = useToggle();
  const buttonMarkup = <FormButton onClick={flipToggle}>Fire</FormButton>;
  const origin = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };

  return (
    <AppProvider theme="dark">
      <Fireworks
        origin={origin}
        activator={buttonMarkup}
        toggle={toggle}
        count={5}
        interval={100}
      />
    </AppProvider>
  );
};
