import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Login, { LoginProps } from '../lib/components/forms/Login';

export default {
  title: 'Forms/Login',
  component: Login
} as Meta;

const Template: Story<LoginProps> = (args) => <Login {...args} />;

export const Default = Template.bind({});
Default.args = {
};
