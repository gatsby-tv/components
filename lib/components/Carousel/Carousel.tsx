import React, {
  useRef,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";

import { Image } from "../Image";
import { ModalProps, ModalContext } from "../Modal";

import { BackArrow, NextArrow, Slider } from "./components"

import * from "./Styles"

interface JumpAction {
  type: "jump";
  desired: number;
}

interface SyncAction {
  type: "sync";
}

type CarouselAction = JumpAction | SyncAction;

interface CarouselState {
  current: number;
  desired: number;
}

type CarouselItem = {
  source: string;
  modalProps: string;
};

export interface CarouselProps {
  items: CarouselItem[];
  itemWidth: number;
  itemHeight: number;
  modalGenerator(args: object): React.Node;
};

export const Carousel: React.FC<CarouselProps> = (props) => {
  const setModal = useContext(ModalContext);
  const mask = useRef(null);
  const [width, setWidth] = useState(0);

  /* We need the items to divide the number of visible slides evenly.
     Thus, perhaps controversially, we will remove any remainders. */

  const slidesPerGroup = Math.floor(width / props.itemWidth);
  const slidesToRemove = props.items.length % slidesPerGroup;
  const items = props.items.slice(0, props.items.length - slidesToRemove);

  const slides = items.map((item: CarouselItem, index: number) => (
    <Slide
      key={index}
      groupSize={slidesPerGroup}
      onClick={() => setModal(props.modalGenerator(item.modalProps))}
    >
      <Item>
        <Image
          source={item.source}
          aspectRatio={props.itemHeight / props.itemWidth}
        />
      </Item>
    </Slide>
  ));

  const slideChunks = Array.from(
    { length: Math.ceil(slides.length / slidesPerGroup) },
    (_: any, index: number) =>
      slides.slice(slidesPerGroup * index, slidesPerGroup * (index + 1))
  );

  const groups = slideChunks.map((chunk: React.Node[], index: number) => (
    <Group key={index} width={width}>
      {chunk}
    </Group>
  ));

  const [state, setState] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "jump":
          return { ...state, desired: action.desired };

        case "sync":
          return { ...state, current: state.desired };

        default:
          return state;
      }
    },
    { current: 0, desired: 0 }
  );

  useEffect(() => {
    const handleResize = () => setWidth(mask.current.offsetWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mask.current]);

  useEffect(() => {
    const id = setTimeout(
      () => setState({ type: "sync" }),
      500
    );

    return () => clearTimeout(id);
  }, [state.desired]);

  const next = () =>
    setState({
      type: "jump",
      desired: (state.current + 1) % groups.length,
    });

  const prev = () =>
    setState({
      type: "jump",
      desired: (state.current + groups.length - 1) % groups.length,
    });

  return (
    <Container>
      <PrimaryBox>
        <BackArrow onClick={prev} />
        <Mask ref={mask}>
          <Slider
            desired={state.desired}
            current={state.current}
            length={groups.length}
            duration={500}
          >
            <Group className="gz-carousel-group-buffer-0" width={width}>
              {slideChunks[slideChunks.length - 1]}
            </Group>
            {groups}
            <Group className="gz-carousel-group-buffer-1" width={width}>
              {slideChunks[0]}
            </Group>
          </Slider>
        </Mask>
        <NextArrow onClick={next} />
      </PrimaryBox>
    </Container>
  );
};
