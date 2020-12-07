import React from "react";
import styled from "styled-components";

import { Scroll } from "@lib/components/Scroll";

import { MainFrame, TopFrame, SideFrame } from "./components";

const FrameBase = styled.div`
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export interface FrameProps {
  children?: React.ReactNode;
  topbar?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export const Frame: React.FC<FrameProps> = (props) => (
  <FrameBase>
    <TopFrame topbar={props.topbar}>
      <SideFrame sidebar={props.sidebar}>
        <MainFrame>{props.children}</MainFrame>
      </SideFrame>
    </TopFrame>
  </FrameBase>
);
