import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, RoundedBox } from "@app/components";

import { Connected, ConnectedProps } from "./Connected";

const leftMarkup = (
  <RoundedBox bg="black" boxHeight="100%" boxWidth="6rem" radius="1rem" />
);

const rightMarkup = (
  <RoundedBox bg="black" boxHeight="100%" boxWidth="6rem" radius="1rem" />
);

const leftColumnMarkup = (
  <RoundedBox bg="black" boxHeight="2rem" boxWidth="100%" radius="1rem" />
);

const rightColumnMarkup = (
  <RoundedBox bg="black" boxHeight="2rem" boxWidth="100%" radius="1rem" />
);

const contentMarkup = (
  <RoundedBox bg="white" boxHeight="2rem" boxWidth="100%" radius="1rem" />
);

const contentListMarkup = (
  <>
    {contentMarkup}
    {contentMarkup}
    {contentMarkup}
  </>
);

export default {
  title: "Connected",
  component: Connected,
} as Meta;

const Template: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected {...args} />
  </AppProvider>
);

export const Default = Template.bind({});
Default.args = {
  children: contentMarkup,
};

export const WithMultipleItems = Template.bind({});
WithMultipleItems.args = {
  children: contentListMarkup,
};

export const WithLeftConnection = Template.bind({});
WithLeftConnection.args = {
  children: contentMarkup,
  left: leftMarkup,
};

export const WithRightConnection = Template.bind({});
WithRightConnection.args = {
  children: contentMarkup,
  right: rightMarkup,
};

export const WithBothConnections = Template.bind({});
WithBothConnections.args = {
  children: contentMarkup,
  left: leftMarkup,
  right: rightMarkup,
};

export const WithBothConnectionsMultipleItems = Template.bind({});
WithBothConnectionsMultipleItems.args = {
  children: contentListMarkup,
  left: leftMarkup,
  right: rightMarkup,
};

export const Column = Template.bind({});
Column.args = {
  children: contentMarkup,
  column: true,
};

export const ColumnWithMultipleItems = Template.bind({});
ColumnWithMultipleItems.args = {
  children: contentListMarkup,
  column: true,
};

export const ColumnWithLeftConnection = Template.bind({});
ColumnWithLeftConnection.args = {
  children: contentMarkup,
  left: leftColumnMarkup,
  column: true,
};

export const ColumnWithRightConnection = Template.bind({});
ColumnWithRightConnection.args = {
  children: contentMarkup,
  right: rightColumnMarkup,
  column: true,
};

export const ColumnWithBothConnections = Template.bind({});
ColumnWithBothConnections.args = {
  children: contentMarkup,
  left: leftColumnMarkup,
  right: rightColumnMarkup,
  column: true,
};

export const ColumnWithBothConnectionsMultipleItems = Template.bind({});
ColumnWithBothConnectionsMultipleItems.args = {
  children: contentListMarkup,
  left: leftColumnMarkup,
  right: rightColumnMarkup,
  column: true,
};
