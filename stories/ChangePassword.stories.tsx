import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import ChangePassword, { ChangePasswordProps } from '../lib/components/forms/ChangePassword';

export default {
  title: 'Forms/ChangePassword',
  component: ChangePassword
} as Meta;

const Template: Story<ChangePasswordProps> = (args) => <ChangePassword {...args} />;

export const Default = Template.bind({});
Default.args = {
};
