import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Circle, Position } from "@app/components";

import { Avatar, AvatarProps } from "./Avatar";

const overlayMarkup = (
  <Position bottom={0} right={0}>
    <Circle size="1.5rem" bg="gatsbyGold" />
  </Position>
);

export default {
  title: "Avatar",
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => (
  <AppProvider theme="dark">
    <Avatar {...args} />
  </AppProvider>
);

export const Small = Template.bind({});
Small.args = {
  src: "https://loremflickr.com/150/150",
  size: "small",
  ariaLabel: "Small avatar",
};

export const SmallWithOverlay = Template.bind({});
SmallWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  overlay: overlayMarkup,
  size: "small",
  ariaLabel: "Small avatar",
};

export const SmallSkeleton = Template.bind({});
SmallSkeleton.args = {
  size: "small",
  ariaLabel: "Small avatar",
};

export const Medium = Template.bind({});
Medium.args = {
  src: "https://loremflickr.com/150/150",
  size: "medium",
  ariaLabel: "Medium avatar",
};

export const MediumWithOverlay = Template.bind({});
MediumWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  overlay: overlayMarkup,
  size: "medium",
  ariaLabel: "Medium avatar",
};

export const MediumSkeleton = Template.bind({});
MediumSkeleton.args = {
  size: "medium",
  ariaLabel: "Medium avatar",
};

export const Large = Template.bind({});
Large.args = {
  src: "https://loremflickr.com/150/150",
  size: "large",
  ariaLabel: "Large avatar",
};

export const LargeWithOverlay = Template.bind({});
LargeWithOverlay.args = {
  src: "https://loremflickr.com/150/150",
  overlay: overlayMarkup,
  size: "large",
  ariaLabel: "Large avatar",
};

export const LargeSkeleton = Template.bind({});
LargeSkeleton.args = {
  size: "large",
  ariaLabel: "Large avatar",
};
