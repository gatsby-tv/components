import React from "react";
import { css } from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";
import { LoremIpsum } from "react-lorem-ipsum";
import { useToggle } from "@gatsby-tv/utilities";

import { AppProvider } from "@lib/components/AppProvider";
import { Card } from "@lib/components/Card";
import { TextHeading } from "@lib/components/TextHeading";
import { TextBox } from "@lib/components/TextBox";
import { FormButton } from "@lib/components/FormButton";
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

export const Example: Story<ModalProps> = () => {
  const { toggle, flipToggle, setToggle } = useToggle(false);

  return (
    <AppProvider theme="dark">
      <FormButton css={buttonStyle} onClick={flipToggle}>
        ClickMe
      </FormButton>
      <Modal fullscreen active={toggle} onExit={() => setToggle(false)}>
        <Card css={cardStyle} w="60vw" h="70vh">
          <Scroll hide>
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
