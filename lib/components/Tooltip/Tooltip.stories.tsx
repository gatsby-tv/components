import React, { useRef, useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { css } from "styled-components";

import { AppProvider } from "@lib/components/AppProvider";
import { Box } from "@lib/components/Box";
import { FormButton } from "@lib/components/FormButton";
import { TextBox } from "@lib/components/TextBox";

import { Tooltip, TooltipProps } from "./Tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
} as Meta;

const buttonStyle = css`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background[3]};
`;

export const Example: Story<TooltipProps> = () => {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  return (
    <AppProvider theme="dark">
      <Box ref={ref} w="fit-content">
        <FormButton css={buttonStyle}>HoverMe</FormButton>
      </Box>
      <Tooltip for={ref} fade placement="right">
        <TextBox>
          <p>Hello! This is a tooltip.</p>
        </TextBox>
      </Tooltip>
    </AppProvider>
  );
};
