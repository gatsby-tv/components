import React, { useState } from "react";
import styled from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import Modal, { ModalProps, ModalContext } from "../lib/components/Modal";
import Navbar, { NavbarProps } from "../lib/components/Navbar";
import Sidebar, { SidebarProps } from "../lib/components/Sidebar";
import Carousel, { CarouselProps } from "../lib/components/Carousel";
import Scroll, { ScrollProps } from "../lib/components/Scroll";
import Stream, { StreamProps } from "../lib/components/Stream";
import Preview, { PreviewProps } from "../lib/components/Video/Preview";

import * as NavbarStories from "./Navbar.stories";
import * as SidebarStories from "./Sidebar.stories";
import * as CarouselStories from "./Carousel.stories";
import * as PreviewStories from "./Preview.stories";

import "../lib/config/styles.css";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  overflow: hidden;
  background-color: var(--dark-grey-0);
`;

const PrimaryBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;

  position: relative;
`;

const SecondaryBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 0;
  flex-shrink: 0;

  position: relative;
  height: calc(100vh - 5rem);
`;

const TertiaryBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  justify-content: center;
`;

const ContentContainer = styled.div`
  position: relative;
  width: calc(100vw - 29rem);
  margin: 0 12rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 1.4rem;

  position: relative;
  margin-bottom: 3rem;
`;

const Header = styled.h2`
  font-stretch: normal;
  font-weight: 500;
  font-size: 2rem;
  margin: 2rem 0 0.5rem 0;
`;

const Separator = styled.hr`
  margin-top: 2rem;
  width: 100%;

  border-color: var(--dark-grey-5);
`;

type HomePageProps = {
  preview: PreviewProps;
  navbar: NavbarProps;
  sidebar: SidebarProps;
  carousel: CarouselProps;
};

const HomePage: React.FC<HomePageProps> = (props: HomePageProps) => {
  const [modal, setModal] = useState(null);

  const cardGenerator = (outer) => {
    const cards = Array(3)
      .fill()
      .map((_, inner) => <Preview key={inner} {...props.preview} />);

    return Array(2)
      .fill()
      .map((_, inner) => (
        <CardContainer key={`${outer}/${inner}`}>{cards}</CardContainer>
      ));
  };

  return (
    <Container>
      <ModalContext.Provider value={setModal}>
        {modal && <Modal>{modal}</Modal>}
        <PrimaryBox>
          <Navbar {...props.navbar} />
          <SecondaryBox>
            <Sidebar {...props.sidebar} />
            <Scroll>
              <ContentContainer>
                <TertiaryBox>
                  <Header>Featured Channels</Header>
                  <Carousel {...props.carousel} />
                  <Separator />
                  <Header>Recommended</Header>
                  <Stream generator={cardGenerator} />
                </TertiaryBox>
              </ContentContainer>
            </Scroll>
          </SecondaryBox>
        </PrimaryBox>
      </ModalContext.Provider>
    </Container>
  );
};

export default {
  title: "Pages/Home",
  component: HomePage,
};

const Template: Story<HomePageProps> = (args) => <HomePage {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  navbar: NavbarStories.LoggedIn.args,
  sidebar: SidebarStories.LoggedIn.args,
  carousel: CarouselStories.Example.args,
  preview: PreviewStories.Full.args,
};
