import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Navbar, { NavbarProps } from "../lib/components/Navbar";

export default {
  title: "Navigation/Navbar",
  component: Navbar
} as Meta;

const Template: Story<NavbarProps> = (args) => <Navbar {...args} />;

export const HomeNavigation = Template.bind({});
HomeNavigation.args = {
};
