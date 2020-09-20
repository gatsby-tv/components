import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Preview, { PreviewProps } from "../lib/components/Video/Preview";

export default {
  title: "Video/Preview",
  component: Preview,
  decorators: [(story) => <div style={{ margin: "0 30rem" }}>{story()}</div>],
} as Meta;

const Template: Story<PreviewProps> = (args) => <Preview {...args} />;

export const Example = Template.bind({});
Example.args = {
  thumbnail: {
    imageUrl: "https://loremflickr.com/533/300",
    duration: "7:44",
  },
  profile: {
    imageUrl: "https://loremflickr.com/150/150",
  },
  meta: {
    title: "Spring - Blender Open Movie",
    subtitle: "Blender Animation Studio",
    info: ["5.1M", "1 year ago"],
  },
};
