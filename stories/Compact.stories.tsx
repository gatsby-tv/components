import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Compact, { CompactProps } from "../lib/components/Video/Compact";

export default {
  title: "Video/Compact",
  component: Compact,
  decorators: [(story) => <div style={{ margin: "0 30rem" }}>{story()}</div>],
} as Meta;

const Template: Story<CompactProps> = (args) => <Compact {...args} />;

export const Example = Template.bind({});
Example.args = {
  thumbnail: {
    imageUrl: "https://loremflickr.com/533/300",
    duration: "7:44",
  },
  meta: {
    title: "Spring - Blender Open Movie",
    subtitle: "Blender Animation Studio",
    info: ["5.1M", "1 year ago"],
  },
};
