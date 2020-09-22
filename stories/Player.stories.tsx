import React from "react";
import styled from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import Player, { PlayerProps } from "../lib/components/Player";

import "../lib/config/styles.css";

export default {
  title: "Video/Player",
  component: Player,
  //decorators: [(story) => <div style={{ margin: "0 30rem" }}>{story()}</div>],
} as Meta;

const Template: Story<PlayerProps> = (args) => <Player {...args} />;

export const Example = Template.bind({});
Example.args = {
  video: {
    src:
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Spring_-_Blender_Open_Movie.webm",
    loop: true,
    muted: true,
    autoPlay: true,
    preload: "auto",
  },
};
