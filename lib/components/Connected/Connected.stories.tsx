import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Box } from "@app/components";

import { Connected, ConnectedProps } from "./Connected";

const rounded = css`
  border-radius: 1rem;
`;

const leftMarkup = <Box $fill bg="black" $width="6rem" css={rounded} />;

const rightMarkup = <Box $fill bg="black" $width="6rem" css={rounded} />;

const leftColumnMarkup = <Box $fill bg="black" $height="2rem" css={rounded} />;

const rightColumnMarkup = <Box $fill bg="black" $height="2rem" css={rounded} />;

const contentMarkup = <Box $fill bg="white" $height="2rem" css={rounded} />;

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
