import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import VideoThumbnail, { VideoThumbnailProps } from "../lib/components/VideoThumbnail";

export default {
  title: "Content/VideoThumbnail",
  component: VideoThumbnail
} as Meta;

const Template: Story<VideoThumbnailProps> = (args) => <VideoThumbnail {...args} />;

export const HighViews = Template.bind({});
export const LargeThumbnail = Template.bind({});
HighViews.args = {
  title: "Minecraft, But We Can Swing Like Spiderman",
  thumbnail: "https://i3.ytimg.com/vi/N09x0dQq2P0/maxresdefault.jpg",
  channelThumbnail: "https://yt3.ggpht.com/a/AATXAJyhie__V4bM4sf0fRUFssWzPqPZ_CeNhZZZrz4x1g=s88-c-k-c0xffffffff-no-rj-mo",
  channelHandle: "#Dream",
  views: 4800000,
  uploaded: new Date("December 17, 2019 15:49:00")
};
LargeThumbnail.args = {
  title: "Minecraft, But We Can Swing Like Spiderman",
  thumbnail: "https://store-images.s-microsoft.com/image/apps.608.13510798887677013.5c7792f0-b887-4250-8c4e-4617af9c4509.bcd1385a-ad15-450c-9ddd-3ee80c37121a?mode=scale&q=90&h=1080&w=1920",
  channelThumbnail: "https://yt3.ggpht.com/a/AATXAJyhie__V4bM4sf0fRUFssWzPqPZ_CeNhZZZrz4x1g=s88-c-k-c0xffffffff-no-rj-mo",
  channelHandle: "#Dream",
  views: 4800000,
  uploaded: new Date("December 17, 2019 15:49:00")
}
