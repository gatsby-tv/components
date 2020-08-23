import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ForgotPassword, { ForgotPasswordProps } from '../lib/components/forms/ForgotPassword';

export default {
  title: 'Forms/ForgotPassword',
  component: ForgotPassword
} as Meta;

const Template: Story<ForgotPasswordProps> = (args) => <ForgotPassword {...args} />;

export const Default = Template.bind({});
Default.args = {
};
