import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Box } from "@app/components";
import { Labelled, LabelledProps } from "./Labelled";

export default {
  title: "Labelled",
  component: Labelled,
} as Meta;

const Template: Story<LabelledProps> = (args) => (
  <AppProvider theme="dark">
    <Box boxWidth="70%" marginLeft="5rem">
      <Labelled {...args} />
    </Box>
  </AppProvider>
);

export const Default = Template.bind({});
Default.args = {
  id: "example",
  label: "Example Label",
  children: <input id="example" style={{ width: "100%" }} />,
};

export const WithHelp = Template.bind({});
WithHelp.args = {
  id: "example",
  label: "Example Label",
  help:
    "This is an example for some helpful hints about the component being labeled.",
  children: <input id="example" style={{ width: "100%" }} />,
};
