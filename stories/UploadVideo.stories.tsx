import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';

import UploadVideo, { UploadVideoProps } from '../lib/components/forms/UploadVideo';

export default {
  title: 'Forms/UploadVideo',
  component: UploadVideo
} as Meta;

const Template: Story<UploadVideoProps> = (args) => <UploadVideo {...args} />;

export const Default = Template.bind({});
Default.args = {
  channels: [
    "Gatsby Developer Network",
    "Blender Foundation",
    "Tryptophan"
  ]
};
