import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useTheme } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Stream } from "@lib/components/Stream";
import { Image, ImageProps } from "@lib/components/Image";

import { Frame, FrameProps } from "./Frame";

export default {
  title: "Frame",
  component: Frame,
} as Meta;

const TopbarMarkup = () => {
  const theme = useTheme();

  return <Box h="52px" bg={theme.colors.background[1]} />;
};

const SidebarMarkup = () => {
  const theme = useTheme();

  return <Box w="52px" h={1} bg={theme.colors.background[2]} />;
};

const SourceMarkup = (props: ImageProps) => (
  <Flex.Item>
    <Image {...props} />
  </Flex.Item>
);

const ContentMarkup = () => (
  <Box margin={["52px", "52px", "0px"]}>
    <Stream
      component={SourceMarkup}
      generator={() =>
        [...Array(12)].map(() => ({ src: "", aspectRatio: 0.5625 }))
      }
      groups={3}
      gap="16px"
    />
  </Box>
);

export const Example: Story<FrameProps> = () => (
  <AppProvider theme="dark">
    <Frame topbar={<TopbarMarkup />} sidebar={<SidebarMarkup />}>
      <ContentMarkup />
    </Frame>
  </AppProvider>
);
