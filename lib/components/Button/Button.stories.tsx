import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { Pause } from "@gatsby-tv/icons";

import { AppProvider } from "@lib/components/AppProvider";
import { Icon } from "@lib/components/Icon";

import { Button, ButtonProps } from "./Button";

export default {
  title: "Button",
  component: Button,
} as Meta;

export const TextButton: Story<ButtonProps> = () => (
  <AppProvider $theme="dark">
    <Button>Button</Button>
  </AppProvider>
);

export const IconButton: Story<ButtonProps> = () => (
  <AppProvider $theme="dark">
    <Button $circular>
      <Icon $source={Pause} $width="20px" />
    </Button>
  </AppProvider>
);
