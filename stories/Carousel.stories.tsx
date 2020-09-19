import React from "react";
import styled from "styled-components";
import { Story, Meta } from "@storybook/react/types-6-0";

import Carousel, { CarouselProps } from "../lib/components/Carousel";
import Preview, { PreviewProps } from "../lib/components/Video/Preview";
import Panel, { PanelProps } from "../lib/components/Channel/Panel";

export default {
  title: "Content/Carousel",
  component: Carousel,
  decorators: [(story) => <div style={{ margin: "0 10rem" }}>{story()}</div>],
};

const Template: Story<CarouselProps> = (args) => <Carousel {...args} />;

const keys: string[] = [
  "plane",
  "dog",
  "flower",
  "cat",
  "car",
  "paris",
  "forest",
  "lake",
  "movie",
  "gaming",
  "trailer",
  "candy",
  "mail",
  "bicycle",
  "city",
  "book",
  "fire",
  "airport",
  "video",
  "football",
  "law",
  "writer",
  "breakfast",
  "monkey",
];

const CardContainer = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  gap: 1.4rem;

  position: relative;
  margin: 1rem 0;
`;

const ListAll = styled.a`
  width: calc(100% + 5rem);
  margin-top: 1.5rem;
  margin-left: -3rem;
  padding: 0.5rem;

  color: var(--font-grey-0);
  background-color: var(--dark-grey-4);
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 1.33rem;
  font-weight: 500;
  font-condensed: condensed;

  transition: all 100ms ease;

  &:hover {
    background-color: var(--dark-grey-5);
  }
`;

const getArgs = (key: string) => {
  const cardGenerator = (outer) => {
    const preview = {
      thumbnail: {
        imageUrl: `https://loremflickr.com/640/360/${key}`,
        duration: "7:44",
      },
      meta: {
        title: "Spring - Blender Open Movie",
        info: ["5.1M", "1 year ago"],
      },
    };

    const cards = Array(2)
      .fill()
      .map((_, inner) => <Preview key={inner} {...preview} />);

    if ((outer || 0) < 5) {
      return <CardContainer key={outer}>{cards}</CardContainer>;
    } else if (outer == 5) {
      return <ListAll key={outer}>LIST ALL</ListAll>;
    } else {
      return null;
    }
  };

  return {
    imageUrl: `https://loremflickr.com/250/500/${key}`,
    modalProps: {
      banner: {
        imageUrl: `https://loremflickr.com/711/400/${key}`,
        meta: {
          title: "Blender Animation Studio",
          info: ["220K subscribers", "21 videos", "3 shows"],
          tags: ["Technology", "Film", "Animation"],
        },
      },
      generator: cardGenerator,
    },
  };
};

export const Example = Template.bind({});
Example.args = {
  items: Array.from(keys, getArgs),
  itemWidth: 250,
  itemHeight: 500,
  animationDuration: 500,
  modalGenerator: (args: object) => <Panel {...args} />,
};
