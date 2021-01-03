import React, { useCallback } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { Scroll } from "@lib/components/Scroll";
import { Image } from "@lib/components/Image";

import { Stream, StreamProps } from "./Stream";

export default {
  title: "Stream",
  component: Stream,
} as Meta;

export const Example: Story<StreamProps> = () => {
  const generator = useCallback(async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));
    return { src: "https://loremflickr.com/405/405" };
  }, []);

  return (
    <AppProvider $theme="dark">
      <Box $width="30rem" $height="30rem">
        <Scroll>
          <Box $marginBottom="2rem">
            <Image src="https://loremflickr.com/405/405" />
          </Box>
          <Stream $source={Image} $generator={generator} $column $gap="2rem" />
        </Scroll>
      </Box>
    </AppProvider>
  );
};
