import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Sidebar, { SidebarProps } from "../lib/components/Sidebar";

export default {
  title: "Navigation/Sidebar",
  component: Sidebar
} as Meta;

const Template: Story<SidebarProps> = (args) => <Sidebar {...args} />;

export const Example = Template.bind({});
Example.args = {
  channels: [
    {
      handle: "#gatsbydevelopernetwork",
      img: "https://loremflickr.com/150/150",
      link: "/c/#gatsbydevelopernetwork"
    },
    {
      handle: "#calvingaming",
      img: "https://loremflickr.com/150/150/dog",
      link: "/c/#calvingaming"
    },
    {
      handle: "#tryptocurrency",
      img: "https://loremflickr.com/150/150/truck",
      link: "/c/#tryptocurrency"
    },
    {
      handle: "#dcshighlights",
      img: "https://loremflickr.com/150/150/paris",
      link: "/c/#dcshighlights"
    },
    {
      handle: "#ralfidude",
      img: "https://loremflickr.com/150/150/plane",
      link: "/c/#ralfidude"
    },
    {
      handle: "#pewdiepie",
      img: "https://loremflickr.com/150/150/lock",
      link: "/c/#pewdiepie"
    }
  ]
};
