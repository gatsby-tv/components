import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";

import { useToggle } from "@lib/utilities/use-toggle";
import { AppProvider } from "@lib/components/AppProvider";
import { Card } from "@lib/components/Card";
import { TextHeading } from "@lib/components/TextHeading";
import { TextBox } from "@lib/components/TextBox";
import { Button } from "@lib/components/Button";
import { Scroll } from "@lib/components/Scroll";

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
              <TextHeading>Example Modal</TextHeading>
              <LoremIpsum p={10} />
            </TextBox>
          </Scroll>
        </Card>
      </Modal>
    </AppProvider>
  );
};
