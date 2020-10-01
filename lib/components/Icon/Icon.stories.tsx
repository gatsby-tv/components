import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  Play,
  Pause,
  Subscribe,
  Gatsby,
  Expand,
  Compress,
} from "@gatsby-tv/icons";

import { AppProvider } from "@app/components";
import { Icon, IconProps } from "./Icon";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <AppProvider theme="dark">
    <Icon boxWidth="5rem" boxHeight="5rem" {...args} />
  </AppProvider>
);

export const GatsbyLogo = Template.bind({});
GatsbyLogo.args = {
  src: Gatsby,
  ariaLabel: "Gatsby Logo",
};

export const PlayIcon = Template.bind({});
PlayIcon.args = {
  src: Play,
  ariaLabel: "Play Icon",
};

export const PauseIcon = Template.bind({});
PauseIcon.args = {
  src: Pause,
  ariaLabel: "Pause Icon",
};

export const ExpandIcon = Template.bind({});
ExpandIcon.args = {
  src: Expand,
  ariaLabel: "Expand Icon",
};

export const CompressIcon = Template.bind({});
CompressIcon.args = {
  src: Compress,
  ariaLabel: "Compress Icon",
};

export const SubscribeIcon = Template.bind({});
SubscribeIcon.args = {
  src: Subscribe,
  ariaLabel: "Subscribe Icon",
};
