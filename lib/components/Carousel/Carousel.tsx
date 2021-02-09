import React, {
  useRef,
  useState,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import { ExtendLeft, ExtendRight } from "@gatsby-tv/icons";
import { Negative, useTheme, useResizeObserver } from "@gatsby-tv/utilities";

import { Size } from "@lib/types";
import { CarouselContext } from "@lib/utilities/carousel";
import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Button } from "@lib/components/Button";
import { Icon } from "@lib/components/Icon";

import { Slider, SliderState, SliderAction } from "./components/Slider";
import { Slide, SlideProps } from "./components/Slide";

export type { SlideProps as CarouselSlideProps };

export interface CarouselProps {
  children?: React.ReactNode;
  groups: number;
  gap?: Size;
}

function CarouselBase(props: CarouselProps): React.ReactElement {
  const theme = useTheme();
  const mask = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<string | undefined>(undefined);
  const { gap = theme.spacing[0] } = props;

  /* We need the number of items to divide the number of visible slides evenly.
   * Thus, perhaps controversially, we will remove any remainders. */

  const items = React.Children.count(props.children);

  const slides = React.Children.toArray(props.children).slice(
    0,
    items - (items % props.groups)
  );

  const chunks = Array.from(
    { length: Math.ceil(slides.length / props.groups) },
    (_, index) => slides.slice(index * props.groups, (index + 1) * props.groups)
  );

  const groups = chunks.map((chunk, index) => (
    <Flex key={index} style={{ width }}>
      {chunk}
    </Flex>
  ));

  const [state, dispatch] = useReducer(
    (state: SliderState, action: SliderAction) => {
      switch (action.type) {
        case "jump":
          return { ...state, desired: action.desired };

        case "sync":
          return { ...state, slide: state.desired };
      }
    },
    { slide: 0, desired: 0 }
  );

  useResizeObserver(mask, (content) => setWidth(`${content.inlineSize}px`));

  useEffect(() => {
    const id = setTimeout(() => dispatch({ type: "sync" }), 500);
    return () => clearTimeout(id);
  }, [state.desired]);

  const next = useCallback(
    () =>
      dispatch({ type: "jump", desired: (state.slide + 1) % groups.length }),
    [state.slide, groups.length]
  );

  const prev = useCallback(
    () =>
      dispatch({
        type: "jump",
        desired: (state.slide + groups.length - 1) % groups.length,
      }),
    [state.slide, groups.length]
  );

  const buttonProps = {
    animate: true,
    shadow: true,
    rounded: theme.border.radius.full,
    bg: theme.colors.background[5],
    padding: theme.spacing[1],
  };

  const buttonBoxProps = {
    absolute: true,
    top: `calc(50% - ${theme.spacing[2]})`,
  };

  const SliderMarkup = (
    <Slider state={state} groups={groups.length}>
      <Flex style={{ width }}>{chunks[chunks.length - 1]}</Flex>
      {groups}
      <Flex style={{ width }}>{chunks[0]}</Flex>
    </Slider>
  );

  const ExtendLeftMarkup = (
    <Box left={theme.spacing[1.5]} {...buttonBoxProps}>
      <Button onClick={prev} {...buttonProps}>
        <Icon src={ExtendLeft} w={theme.icon.base} />
      </Button>
    </Box>
  );

  const ExtendRightMarkup = (
    <Box right={theme.spacing[1.5]} {...buttonBoxProps}>
      <Button onClick={next} {...buttonProps}>
        <Icon src={ExtendRight} w={theme.icon.base} />
      </Button>
    </Box>
  );

  return (
    <CarouselContext.Provider value={{ gap, groups: props.groups }}>
      <Box margin={[theme.spacing[0], `calc(${Negative(gap)} / 2)`]}>
        <Box ref={mask} css={{ overflow: "hidden" }} w={1}>
          {SliderMarkup}
          {ExtendLeftMarkup}
          {ExtendRightMarkup}
        </Box>
      </Box>
    </CarouselContext.Provider>
  );
}

export const Carousel = Object.assign(CarouselBase, { Slide });
