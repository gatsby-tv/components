import React, { useCallback } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
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
    <AppProvider theme="dark">
      <Box w="30rem" h="30rem">
        <Scroll>
          <Box marginBottom="2rem">
            <Image src="https://loremflickr.com/405/405" />
          </Box>
          <Flex column gap="2rem">
            <Stream component={Image} generator={generator} />
          </Flex>
        </Scroll>
      </Box>
    </AppProvider>
  );
};
