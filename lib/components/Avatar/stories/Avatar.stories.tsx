import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Avatar, AvatarProps, AvatarSize } from "../Avatar";

import { Overlay } from "./Styles";

export default {
  title: "Avatar",
  component: Avatar,
} as Meta;

const Template: Story<AvatarProps> = (args) => (
  <Avatar source={"https://loremflickr.com/150/150"} {...args} />
);

export const Small = Template.bind({});
Small.args = {
  size: AvatarSize.Small,
};

export const Medium = Template.bind({});
Medium.args = {
  size: AvatarSize.Medium,
};

export const Large = Template.bind({});
Large.args = {
  size: AvatarSize.Large,
};

export const SmallOverlay = Template.bind({});
SmallOverlay.args = {
  size: AvatarSize.Small,
  overlay: <Overlay />,
};

export const MediumOverlay = Template.bind({});
MediumOverlay.args = {
  size: AvatarSize.Medium,
  overlay: <Overlay />,
};

export const LargeOverlay = Template.bind({});
LargeOverlay.args = {
  size: AvatarSize.Large,
  overlay: <Overlay />,
};
