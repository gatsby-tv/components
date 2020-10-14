import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { useToggle } from "@app/utilities";
import {
  AppProvider,
  Card,
  Heading,
  TextBox,
  Button,
  Scroll,
} from "@app/components";

import { Modal, ModalProps } from "./Modal";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

const buttonStyle = css`
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.background[3]};
`;

const cardStyle = css`
  color: ${(props) => props.theme.colors.font.inverted};
  background-color: ${(props) => props.theme.colors.white};
`;

export const Example: Story<ModalProps> = (props) => {
  const { toggle, flipToggle, setToggle } = useToggle(false);

  return (
    <AppProvider theme="dark">
      <Button css={buttonStyle} onClick={flipToggle}>
        ClickMe
      </Button>
      <Modal active={toggle} onExit={() => setToggle(false)}>
        <Card
          $width="60vw"
          $height="70vh"
          css={cardStyle}
          onClick={(event) => event.stopPropagation()}
        >
          <Scroll $hidden vertical>
            <TextBox padding="2rem">
              <Heading>Example Modal</Heading>
              <LoremIpsum p={10} />
            </TextBox>
          </Scroll>
        </Card>
      </Modal>
    </AppProvider>
  );
};
