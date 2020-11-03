import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { useTheme } from "@lib/utilities/use-theme";
import { AppProvider } from "@lib/components/AppProvider";
import { FormButton } from "@lib/components/FormButton";

import { TextField, TextFieldProps } from "./TextField";

export default {
  title: "TextField",
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => (
  <AppProvider theme="dark">
    <TextField placeholder="Example text..." {...args} />
  </AppProvider>
);

const ButtonMarkup: React.FC<{}> = () => {
  const theme = useTheme();

  return (
    <FormButton
      border
      paddingLeft={theme.spacing.tight}
      paddingRight={theme.spacing.tight}
    >
      Button
    </FormButton>
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
