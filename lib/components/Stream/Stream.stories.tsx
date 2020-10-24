import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Box, Scroll, Image } from "@lib/components";

import { Stream, StreamProps } from "./Stream";

export default {
  title: "Stream",
  component: Stream,
} as Meta;

async function generator() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return { src: "https://loremflickr.com/405/405" };
}

export const Example: Story<StreamProps> = (args) => (
  <AppProvider theme="dark">
    <Box $width="30rem" $height="30rem">
      <Scroll vertical>
        <Stream source={Image} generator={generator} gap="2rem" />
      </Scroll>
    </Box>
  </AppProvider>
);
