import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { TextBox } from "@lib/components/TextBox";

import {
  TextMeta,
  TextMetaProps,
  TextMetaListProps,
  TextMetaLinkProps,
} from "./TextMeta";

export default {
  title: "TextMeta",
  component: TextMeta,
} as Meta;

const Template: Story<TextMetaProps> = (args) => (
  <AppProvider $theme="dark">
    <TextBox $spacing="tight" $width="20rem">
      <TextMeta {...args} />
    </TextBox>
  </AppProvider>
);

export const Small = Template.bind({});
Small.args = {
  children: "Meta Text Small",
  $size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  children: "Meta Text Medium",
  $size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  children: "Meta Text Large",
  $size: "large",
};

export const Bold = Template.bind({});
Bold.args = {
  children: "Meta Text Bold",
  $size: "large",
  $bold: true,
};

export const Subdued = Template.bind({});
Subdued.args = {
  children: "Meta Text Subdued",
  $size: "large",
  $subdued: true,
};

export const Truncated = Template.bind({});
Truncated.args = {
  children: "The Art of Storytelling and The Legend of Chun Li",
  $tooltip: true,
  $clamp: 2,
  $size: "large",
  $bold: true,
};

const ListTemplate: Story<TextMetaListProps> = (args) => (
  <AppProvider $theme="dark">
    <TextMeta.List {...args}>
      <TextMeta>First</TextMeta>
      <TextMeta>Second</TextMeta>
      <TextMeta>Third</TextMeta>
    </TextMeta.List>
  </AppProvider>
);

export const ListSmall = ListTemplate.bind({});
ListSmall.args = {
  $size: "small",
};

export const ListMedium = ListTemplate.bind({});
ListMedium.args = {
  $size: "medium",
};

export const ListLarge = ListTemplate.bind({});
ListLarge.args = {
  $size: "large",
};

const LinkTemplate: Story<TextMetaLinkProps> = (args) => (
  <AppProvider $theme="dark">
    <TextMeta.Link {...args}>Text Meta Link</TextMeta.Link>
  </AppProvider>
);

export const LinkSmall = LinkTemplate.bind({});
LinkSmall.args = {
  $size: "small",
};

export const LinkMedium = LinkTemplate.bind({});
LinkMedium.args = {
  $size: "medium",
};

export const LinkLarge = LinkTemplate.bind({});
LinkLarge.args = {
  $size: "large",
};
