import React, { useRef, useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { css } from "styled-components";

import { Tooltip, TooltipProps } from "./Tooltip";
import {
  AppProvider,
  Activatable,
  Flex,
  Box,
  Button,
  TextBox,
} from "@app/components";

export default {
  title: "Tooltip",
  component: Tooltip,
};

const buttonStyle = css`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background[3]};
`;

export const Example: Story<TooltipProps> = (props) => {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  return (
    <AppProvider theme="dark">
      <Box ref={ref} $width="fit-content">
        <Button
          css={buttonStyle}
          onMouseOver={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
        >
          HoverMe
        </Button>
      </Box>
      <Tooltip $for={ref} placement="right">
        <Activatable active={active} duration={200} delay={500}>
          <TextBox>
            <p>Hello! This is a tooltip.</p>
          </TextBox>
        </Activatable>
      </Tooltip>
    </AppProvider>
  );
};
