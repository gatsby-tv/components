import React, { useEffect } from "react";
import styled from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import Navbar, { NavbarProps } from "../lib/components/Navbar";
import Player, { PlayerProps } from "../lib/components/Player";
import Preview, { PreviewProps } from "../lib/components/Video/Preview";
import Stream, { StreamProps } from "../lib/components/Stream";
import Scroll, { ScrollProps } from "../lib/components/Scroll";
import { Promote, Subscribe, Donate, Tip, Misc } from "../lib/components/Icons";

import * as NavbarStories from "./Navbar.stories";
import * as PlayerStories from "./Player.stories";
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
  flex-direction: column;
  flex-wrap: nowrap;

  position: relative;
`;

const TertiaryBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;

  margin-right: 3rem;
`;

const ContentContainer = styled.div`
  position: relative;
  height: calc(100vh - 5rem);
  width: 100%;
`;

const BrowseContainer = styled.div`
  margin: 0.5rem 5rem;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 1.4rem;

  position: relative;
  margin-bottom: 3rem;
`;

const TitleContainer = styled.div`
  flex-grow: 2;
`;

const StreamContainer = styled.div`
  flex-grow: 1;
`;

const InfoContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  justify-content: flex-end;
  align-items: flex-end;

  button:last-child {
    fill: var(--light-grey-9);
    opacity: 0.6;

    transition: all 100ms ease;

    &:hover {
      opacity: 0.7;
      transform: none;
    }
  }
`;

const Button = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 4rem;

  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;
  fill: var(--gatsby-gold);

  transition: all 100ms ease;

  &:hover {
    fill: var(--gatsby-gold-light);
    transform: scale(1.05);
  }
`;

const Separator = styled.hr`
  margin: 1.25rem 0;
  width: 100%;

  border-width: 1px;
  border-style: solid;
  border-color: var(--dark-grey-5);
`;

const Title = styled.h2`
  font-stretch: normal;
  font-weight: 500;
  font-size: 2rem;
  margin: 1rem 0 0.5rem 0;
`;

const Info = styled.span`
  font-stretch: semi-condensed;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--font-grey-1);
`;

type ViewPageProps = {
  navbar: NavbarProps;
  player: PlayerProps;
  preview: PreviewProps;
};

const ViewPage: React.FC<ViewPageProps> = (props: ViewPageProps) => {
  const cardGenerator = (outer) => {
    const cards = Array(1)
      .fill()
      .map((_, inner) => <Preview key={inner} {...props.preview} />);

    return Array(2)
      .fill()
      .map((_, inner) => (
        <CardContainer key={`${outer}/${inner}`}>{cards}</CardContainer>
      ));
  };

  const info = props.preview.meta.info
    .map((value, index) => [
      <Info key={index}>{value}</Info>,
      <Info key={`${index}/dot`}>•</Info>,
    ])
    .flat()
    .slice(0, -1);

  return (
    <Container>
      <PrimaryBox>
        <Navbar {...props.navbar} />
        <Scroll>
          <ContentContainer>
            <SecondaryBox>
              <Player {...props.player} />
              <BrowseContainer>
                <TertiaryBox>
                  <DescriptionBox>
                    <TitleBox>
                      <TitleContainer>
                        <Title>Spring - Blender Open Movie</Title>
                        <InfoContainer>{info}</InfoContainer>
                      </TitleContainer>
                      <ButtonBox>
                        <Button>
                          <Promote />
                        </Button>
                        <Button>
                          <Subscribe />
                        </Button>
                        <Button>
                          <Donate />
                        </Button>
                        <Button>
                          <Tip />
                        </Button>
                        <Button>
                          <Misc />
                        </Button>
                      </ButtonBox>
                    </TitleBox>
                    <Separator />
                  </DescriptionBox>
                  <StreamContainer>
                    <Title>Related</Title>
                    <Stream generator={cardGenerator} />
                  </StreamContainer>
                </TertiaryBox>
              </BrowseContainer>
            </SecondaryBox>
          </ContentContainer>
        </Scroll>
      </PrimaryBox>
    </Container>
  );
};

export default {
  title: "Pages/View",
  component: ViewPage,
};

const Template: Story<ViewPageProps> = (args) => <ViewPage {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  navbar: NavbarStories.LoggedIn.args,
  player: PlayerStories.Example.args,
  preview: PreviewStories.Compact.args,
};
