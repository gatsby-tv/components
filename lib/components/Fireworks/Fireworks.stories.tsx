import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { css } from "styled-components";

import { Fireworks, FireworksProps } from "./Fireworks";

import { useToggle } from "@lib/utilities";
import { Button, AppProvider } from "@lib/components";

export default {
  title: "Fireworks",
  component: Fireworks,
} as Meta;

const buttonStyle = css`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background[3]};
`;

export const Infinite: Story<FireworksProps> = (args) => {
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

export const WithButton: Story<FireworksProps> = (args) => {
  const { toggle, flipToggle } = useToggle();
  const buttonMarkup = (
    <Button css={buttonStyle} onClick={flipToggle}>
      Fire
    </Button>
  );
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
