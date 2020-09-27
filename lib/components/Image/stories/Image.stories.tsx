import React from "react";

import { Image, ImageProps } from "../Image";

import { Container, Overlay } from "./Styles";

export default {
  title: "Image",
  component: Image,
} as Meta;

const Template: Story<ImageProps> = (args) => (
  <Container>
    <Image {...args} />
  </Container>
);

export const DefaultAspectRatio = Template.bind({});
DefaultAspectRatio.args = {
  source: "https://loremflickr.com/405/405",
};

export const DefaultAspectRatioSkeleton = Template.bind({});
DefaultAspectRatioSkeleton.args = {
  source: "",
};

export const WideAspectRatio = Template.bind({});
WideAspectRatio.args = {
  source: "https://loremflickr.com/720/405",
  aspectRatio: 9 / 16,
};

export const WideAspectRatioSkeleton = Template.bind({});
WideAspectRatioSkeleton.args = {
  source: "",
  aspectRatio: 9 / 16,
};

export const TallAspectRatio = Template.bind({});
TallAspectRatio.args = {
  source: "https://loremflickr.com/405/720",
  aspectRatio: 16 / 9,
};

export const TallAspectRatioSkeleton = Template.bind({});
TallAspectRatioSkeleton.args = {
  source: "",
  aspectRatio: 16 / 9,
};

export const WithOverlay = Template.bind({});
WithOverlay.args = {
  source: "https://loremflickr.com/405/405",
  overlay: <Overlay />,
};
