import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0"
import { LoremIpsum } from "react-lorem-ipsum"

import { DisplayText, DisplayTextProps, DisplayTextSize } from "../DisplayText"

export default {
  title: "DisplayText",
  component: DisplayText,
} as Meta;

const Template: Story<DisplayTextProps> = (args) => (
  <DisplayText {...args}>
    <LoremIpsum avgSentencesPerParagraph={2} />
  </DisplayText>
)

export const Small = Template.bind({})
Small.args = {
  size: DisplayTextSize.Small,
}

export const Medium = Template.bind({})
Medium.args = {
  size: DisplayTextSize.Medium,
}

export const Large = Template.bind({})
Large.args = {
  size: DisplayTextSize.Large,
}

export const ExtraLarge = Template.bind({})
ExtraLarge.args = {
  size: DisplayTextSize.ExtraLarge,
}
