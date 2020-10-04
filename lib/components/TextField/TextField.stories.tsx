import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { AppProvider, Button } from "@app/components";
import { useTheme } from "@app/utilities";

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
    <Button
      $height={1}
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