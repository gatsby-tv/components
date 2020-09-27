import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Search, SearchProps } from "../Search";

export default {
  title: "Search",
  component: Search,
} as Meta;

const keys: string[] = [
  "plane",
  "dog",
  "flower",
  "cat",
  "car",
  "paris",
  "forest",
  "lake",
  "movie",
  "gaming",
  "trailer",
  "candy",
  "mail",
  "bicycle",
  "city",
  "book",
  "fire",
  "airport",
  "video",
  "football",
  "law",
  "writer",
  "breakfast",
  "monkey",
];

const generator = (query) => {
  return keys
    .slice(query.length, query.length + 7)
    .map((value, index) => ({ href: "", match: value }));
};

const Template: Story<SearchProps> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  generator: generator,
};
