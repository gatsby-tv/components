import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Navbar, { NavbarProps } from "../lib/components/Navbar";

import * as SearchStories from "./Search.stories";

export default {
  title: "Navigation/Navbar",
  component: Navbar,
} as Meta;

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  profile: {
    imageUrl: "https://loremflickr.com/150/150/car",
  },
  search: SearchStories.Example.args,
};
