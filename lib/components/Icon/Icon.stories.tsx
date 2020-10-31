import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import {
  Gatsby,
  Play,
  Pause,
  SkipBackward,
  SkipForward,
  Expand,
  Compress,
  Exclamation,
  Spinner,
} from "@gatsby-tv/icons";

import { AppProvider } from "@lib/components/AppProvider";

import { Icon, IconProps } from "./Icon";

export default {
  title: "Icon",
  component: Icon,
} as Meta;

const Template: Story<IconProps> = (args) => (
  <AppProvider theme="dark">
    <Icon $width="5rem" $height="5rem" {...args} />
  </AppProvider>
);

export const GatsbyLogo = Template.bind({});
GatsbyLogo.args = {
  source: Gatsby,
  ariaLabel: "Gatsby Logo",
};

export const PlayIcon = Template.bind({});
PlayIcon.args = {
  source: Play,
  ariaLabel: "Play Icon",
};

export const PauseIcon = Template.bind({});
PauseIcon.args = {
  source: Pause,
  ariaLabel: "Pause Icon",
};

export const ExpandIcon = Template.bind({});
ExpandIcon.args = {
  source: Expand,
  ariaLabel: "Expand Icon",
};

export const CompressIcon = Template.bind({});
CompressIcon.args = {
  source: Compress,
  ariaLabel: "Compress Icon",
};

export const SkipForwardIcon = Template.bind({});
SkipForwardIcon.args = {
  source: SkipForward,
  ariaLabel: "Skip Forward Icon",
};

export const SkipBackwardIcon = Template.bind({});
SkipBackwardIcon.args = {
  source: SkipBackward,
  ariaLabel: "Skip Backward Icon",
};

export const SpinnerIcon = Template.bind({});
SpinnerIcon.args = {
  source: Spinner,
  ariaLabel: "Spinner Icon",
};

export const ExclamationIcon = Template.bind({});
ExclamationIcon.args = {
  source: Exclamation,
  ariaLabel: "Exclamation Icon",
};
