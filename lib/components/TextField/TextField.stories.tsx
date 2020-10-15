import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Button } from "@app/components";
import { useTheme } from "@app/utilities";

import { TextField, TextFieldProps } from "./TextField";

export default {
  title: "TextField",
  component: TextField,
} as Meta;

const buttonStyle = css`
  border-radius: ${(props) => props.theme.border.radius.small};
  background-color: ${(props) => props.theme.colors.background[4]};
  height: 100%;
`;

const inputStyle = css`
  border-radius: ${(props) => props.theme.border.radius.small};
  background-color: ${(props) => props.theme.colors.background[3]};
`;

const Template: Story<TextFieldProps> = (args) => (
  <AppProvider theme="dark">
    <TextField css={inputStyle} placeholder="Example text..." {...args} />
  </AppProvider>
);

const ButtonMarkup: React.FC<{}> = () => {
  const theme = useTheme();

  return (
    <Button
      css={buttonStyle}
      paddingLeft={theme.spacing.tight}
      paddingRight={theme.spacing.tight}
    >
      Button
    </Button>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Text Field",
};

export const WithPrefix = Template.bind({});
WithPrefix.args = {
  label: "Text Field",
  prefix: "$",
};

export const WithLeftConnection = Template.bind({});
WithLeftConnection.args = {
  label: "Text Field with Left Button",
  left: <ButtonMarkup />,
};

export const WithHelpInfo = Template.bind({});
WithHelpInfo.args = {
  label: "Text Field with help text",
  help: "Example text providing helpful info.",
};

export const WithError = Template.bind({});
WithError.args = {
  label: "Text Field with error",
  error: Error("An error has occurred"),
};
