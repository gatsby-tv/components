import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Sidebar, { SidebarProps } from "../lib/components/Sidebar";

export default {
  title: "Navigation/Sidebar",
  component: Sidebar,
} as Meta;

const keys: string[] = [
  "cartoon",
  "lock",
  "truck",
  "space",
  "candy",
  "theater",
  "circus",
  "music",
  "city",
  "art",
  "crime",
  "party",
];

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  profiles: keys.map((key, index) => ({
    imageUrl: `https://loremflickr.com/150/150/${key}`,
  })),
};
