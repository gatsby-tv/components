import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import "../lib/assets/css/styles.css";

import Search, { SearchProps } from "../lib/components/Search";

export default {
  title: "Navigation/Search",
  component: Search,
} as Meta;

const Template: Story<SearchProps> = (args) => <Search {...args} />;

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

const suggestionGenerator = (query: string) => {
  return keys
    .slice(query.length, query.length + 7)
    .map((value, index) => ({ href: "/", match: value }));
};

export const Example = Template.bind({});
Example.args = {
  generator: suggestionGenerator,
};
