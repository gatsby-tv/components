import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Box } from "@app/components";

import { Connected, ConnectedProps } from "./Connected";

const rounded = css`
  border-radius: 1rem;
`;

const LeftMarkup = () => <Box $fill bg="black" $width="6rem" css={rounded} />;

const RightMarkup = () => <Box $fill bg="black" $width="6rem" css={rounded} />;

const LeftColumnMarkup = () => (
  <Box $fill bg="black" $height="2rem" css={rounded} />
);

const RightColumnMarkup = () => (
  <Box $fill bg="black" $height="2rem" css={rounded} />
);

const ContentMarkup = () => (
  <Connected.Item>
    <Box $fill bg="white" $height="2rem" css={rounded} />
  </Connected.Item>
);

const ContentListMarkup = () => (
  <>
    <ContentMarkup />
    <ContentMarkup />
    <ContentMarkup />
  </>
);

export default {
  title: "Connected",
  component: Connected,
} as Meta;

export const Default: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithMultipleItems: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);

export const WithLeftConnection: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected left={<LeftMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithRightConnection: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected right={<RightMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithBothConnection: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected left={<LeftMarkup />} right={<RightMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const WithBothConnectionsMultipleItems: Story<ConnectedProps> = (
  args
) => (
  <AppProvider theme="dark">
    <Connected left={<LeftMarkup />} right={<RightMarkup />}>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);

export const Column: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected column>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithMultipleItems: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected column>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithLeftConnection: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected column left={<LeftColumnMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithRightConnection: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected column right={<RightColumnMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithBothConnection: Story<ConnectedProps> = (args) => (
  <AppProvider theme="dark">
    <Connected column left={<LeftColumnMarkup />} right={<RightColumnMarkup />}>
      <ContentMarkup />
    </Connected>
  </AppProvider>
);

export const ColumnWithBothConnectionsMultipleItems: Story<ConnectedProps> = (
  args
) => (
  <AppProvider theme="dark">
    <Connected column left={<LeftColumnMarkup />} right={<RightColumnMarkup />}>
      <ContentListMarkup />
    </Connected>
  </AppProvider>
);
