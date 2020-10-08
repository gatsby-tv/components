import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { AppProvider, TextBox, Box } from "@app/components";
import { Scroll, ScrollProps } from "./Scroll";

export default {
  title: "Scroll",
  component: Scroll,
} as Meta;

const Template: Story<ScrollProps> = (args) => (
  <AppProvider theme="dark">
    <Scroll {...args}>
      <TextBox $height="30rem">
        <LoremIpsum p={7} />
      </TextBox>
    </Scroll>
  </AppProvider>
);

export const Vertical = Template.bind({});
Vertical.args = {
  vertical: true,
};

export const Hidden = Template.bind({});
Hidden.args = {
  vertical: true,
  $hidden: true,
};
