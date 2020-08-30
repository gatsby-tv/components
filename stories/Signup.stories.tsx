import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Signup, { SignupProps } from "../lib/components/forms/Signup";

export default {
  title: "Forms/Signup",
  component: Signup
} as Meta;

const Template: Story<SignupProps> = (args) => <Signup {...args} />;

export const Default = Template.bind({});
Default.args = {
};
