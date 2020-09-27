import React, { useState } from "react";
import { Story, Meta } from "@storybook/react/types-6-0";

import { Modal, ModalContext } from "../../Modal";

import { Panel, PanelProps } from "../Panel";

import { Card } from "./Styles";

export default {
  title: "Panel",
  component: Panel,
} as Meta;

const Template: Story<PanelProps> = (args) => {
  const [modal, setModal] = useState(null);

  return (
    <ModalContext.Provider value={setModal}>
      {modal && <Modal>{modal}</Modal>}
      <button onClick={() => setModal(<Panel {...args} />)}>Activate</button>
    </ModalContext.Provider>
  );
};

export const Blank = Template.bind({});
Blank.args = {};

export const SmallCard = Template.bind({});
SmallCard.args = {
  children: <Card size="32rem" />,
};

export const MediumCard = Template.bind({});
MediumCard.args = {
  children: <Card size="52rem" />,
};

export const LargeCard = Template.bind({});
LargeCard.args = {
  children: <Card size="72rem" />,
};
