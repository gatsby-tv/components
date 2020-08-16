import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Sidebar, { SidebarProps } from '../lib/components/Sidebar';

export default {
  title: 'Navigation/Sidebar',
  component: Sidebar
} as Meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const HomeNavigation = Template.bind({});
HomeNavigation.args = {
  items: [
    {
      label: "Home",
      link: "/home"
    },
    {
      label: "Subscriptions",
      link: "/subscriptions"
    },
    {
      label: "Promoted",
      link: "/promoted"
    }
  ]
};
