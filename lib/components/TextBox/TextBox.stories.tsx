import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { AppProvider, Heading, Subheading } from "@app/components";
import { TextBox, TextBoxProps } from "./TextBox";

export default {
  title: "TextBox",
  component: TextBox,
} as Meta;

const Template: Story<TextBoxProps> = (args) => (
  <AppProvider theme="dark">
    <TextBox {...args}>
      <Heading>Text Box Component</Heading>
      <Subheading>Example</Subheading>
      <LoremIpsum p={2} />
    </TextBox>
  </AppProvider>
);

export const Example = Template.bind({});
Example.args = {
  $spacing: "tight",
};
