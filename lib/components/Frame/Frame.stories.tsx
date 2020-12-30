import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { useTheme } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Stream } from "@lib/components/Stream";
import { Image } from "@lib/components/Image";

import { Frame, FrameProps } from "./Frame";

export default {
  title: "Frame",
  component: Frame,
} as Meta;

const TopbarMarkup = () => {
  const theme = useTheme();

  return <Box $height="52px" $bg={theme.colors.background[1]} />;
};

const SidebarMarkup = () => {
  const theme = useTheme();

  return <Box $width="52px" $height={1} $bg={theme.colors.background[2]} />;
};

const SourceMarkup = () => (
  <Flex $gap="16px">
    <Image src="" $aspectRatio={9 / 16} />
    <Image src="" $aspectRatio={9 / 16} />
    <Image src="" $aspectRatio={9 / 16} />
  </Flex>
);

const ContentMarkup = () => (
  <Box
    $marginTop="52px"
    $marginLeft="52px"
    $marginRight="52px"
    $height="calc(100vh - 104px)"
  >
    <Stream
      $column
      $source={SourceMarkup}
      $generator={() => [...Array(4)].map(() => ({}))}
      $gap="52px"
    />
  </Box>
);

export const Example: Story<FrameProps> = () => (
  <AppProvider $theme="dark">
    <Frame $topbar={<TopbarMarkup />} $sidebar={<SidebarMarkup />}>
      <ContentMarkup />
    </Frame>
  </AppProvider>
);
