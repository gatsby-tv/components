import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import { useSelection } from "@app/utilities";
import { AppProvider, TextBox, Box } from "@app/components";
import { Navigation, NavigationProps } from "./Navigation";

export default {
  title: "Navigation",
  component: Navigation,
} as Meta;

const navigationStyle = css`
  & li[data-selected] {
    color: ${(props) => props.theme.colors.blue};
    background-color: ${(props) => props.theme.colors.background[3]};
  }

  & li {
    padding: ${(props) => props.theme.spacing.baseTight}
      ${(props) => props.theme.spacing.base};
    transition: all 100ms ease;
  }

  ${Navigation.Section.Title} {
    padding: ${(props) => props.theme.spacing.tight}
      ${(props) => props.theme.spacing.base};
  }
`;

const wrapperStyle = css`
  background-color: ${(props) => props.theme.colors.background[4]};
`;

export const OneSection: Story<NavigationProps> = (args) => {
  const items = ["one", "two", "three"];
  const [selection, select] = useSelection(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} $width="20rem">
        <Navigation
          scrollHidden
          $css={navigationStyle}
          selection={selection}
          onSelect={select}
        >
          <Navigation.Section>
            <Navigation.Item $id="one">
              <TextBox>One</TextBox>
            </Navigation.Item>
            <Navigation.Item $id="two">
              <TextBox>Two</TextBox>
            </Navigation.Item>
            <Navigation.Item $id="three">
              <TextBox>Three</TextBox>
            </Navigation.Item>
          </Navigation.Section>
        </Navigation>
      </Box>
    </AppProvider>
  );
};

export const MultipleSections: Story<NavigationProps> = (args) => {
  const items = ["one", "two", "three", "four", "five"];
  const [selection, select] = useSelection(items, "one");

  return (
    <AppProvider theme="dark">
      <Box css={wrapperStyle} $width="20rem">
        <Navigation
          scrollHidden
          $css={navigationStyle}
          selection={selection}
          onSelect={select}
        >
          <Navigation.Section title="first">
            <Navigation.Item $id="one">
              <TextBox>One</TextBox>
            </Navigation.Item>
            <Navigation.Item $id="two">
              <TextBox>Two</TextBox>
            </Navigation.Item>
            <Navigation.Item $id="three">
              <TextBox>Three</TextBox>
            </Navigation.Item>
          </Navigation.Section>
          <Navigation.Section title="second">
            <Navigation.Item $id="four">
              <TextBox>Four</TextBox>
            </Navigation.Item>
            <Navigation.Item $id="five">
              <TextBox>Five</TextBox>
            </Navigation.Item>
          </Navigation.Section>
        </Navigation>
      </Box>
    </AppProvider>
  );
};
