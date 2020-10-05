import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, TextBox } from "@app/components";
import { Caption, CaptionProps } from "./Caption";

export default {
  title: "Caption",
  component: Caption,
} as Meta;

export const Example: Story<CaptionProps> = (args) => (
  <AppProvider theme="dark">
    <TextBox>
      <p>Example Text</p>
      <Caption>With a caption</Caption>
    </TextBox>
  </AppProvider>
)
