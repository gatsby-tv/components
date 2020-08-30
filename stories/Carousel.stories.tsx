import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import Carousel, { CarouselProps } from "../lib/components/Carousel";

export default {
  title: "Content/Carousel",
  component: Carousel
} as Meta;

const Template: Story<CarouselProps> = (args) => <Carousel {...args} />;

export const Example = Template.bind({});
Example.args = {
  items: [
    {
      title: "#Planes",
      thumbnail: "https://loremflickr.com/150/300/plane"
    },
    {
      title: "#Dogs",
      thumbnail: "https://loremflickr.com/150/300/dog"
    },
    {
      title: "#Flowers",
      thumbnail: "https://loremflickr.com/150/300/flower"
    },
    {
      title: "#Cats",
      thumbnail: "https://loremflickr.com/150/300/cat"
    },
    {
      title: "#Cars",
      thumbnail: "https://loremflickr.com/150/300/car"
    }
  ]
};
