import React, {
  useRef,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import Image, { ImageProps } from "./Image";
import { ModalContext } from "./Modal";

import "../config/styles.css";

const Container = styled.div`
  position: relative;
  margin: 0 -0.7rem;
`;

const PrimaryBox = styled.div`
  display: flex;
  align-items: center;
`;

const ArrowContainer = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  height: 5rem;
  z-index: 500;

  cursor: pointer;
  color: var(--font-color);
  background: none;
  border: none;
  border-radius: 10%;
  outline: none;

  transition: all 250ms ease;

  &:hover {
    color: white;
    background-color: var(--placeholder-color);
  }
`;

const BackArrowContainer = styled(ArrowContainer)`
  left: -7.5rem;
  padding: 0 1.25rem 0 1rem;
`;

const NextArrowContainer = styled(ArrowContainer)`
  right: -7.5rem;
  padding: 0 1rem 0 1.25rem;
`;

const Mask = styled.div`
  width: 100%;

  overflow: hidden;
`;

const Tray = styled.div`
  display: flex;
  align-items: center;

  position: relative;
  width: ${(props) => 100 * (props.length + 2)}%;
  left: ${(props) => -100 * (props.index + 1)}%;
`;

const Group = styled.div`
  display: flex;

  width: ${(props) => props.width}px;
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;

  position: relative;
  z-index: 0;
  width: ${(props) => 100 / props.groupSize}%;
  margin: 0 0.7rem;

  cursor: pointer;

  transition: all 250ms ease;

  &:before {
    content: "";
    display: block;

    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 3;

    transition: all 250ms ease;
  }

  &:hover {
    z-index: 1;
    transform: scale(1.1);

    &:before {
      box-shadow: inset 1rem 0 3rem 0 var(--dark-grey-0),
        inset -1rem 0 3rem 0 var(--dark-grey-0);
    }
  }
`;

const Item = styled.div`
  width: 100%;
  z-index: 2;
`;

const BackArrow = ({ onClick }) => (
  <BackArrowContainer onClick={onClick}>
    <FontAwesomeIcon size="3x" icon={faChevronLeft} />
  </BackArrowContainer>
);

const NextArrow = ({ onClick }) => (
  <NextArrowContainer onClick={onClick}>
    <FontAwesomeIcon size="3x" icon={faChevronRight} />
  </NextArrowContainer>
);

type SliderProps = {
  children: React.Node;
  state: CarouselState;
  length: number;
  duration: number;
};

const Slider: React.FC<SliderProps> = (props) => {
  const { children, state, ...rest } = props;

  const style: React.CSSProperties = {
    transform: "translateX(0)",
    transition: "none",
  };

  if (state.current !== state.desired) {
    const distance = state.current - state.desired;
    const direction =
      Math.sign(distance) * (Math.abs(distance) <= props.length / 2 ? 1 : -1);

    const shift = (100 * direction) / (props.length + 2);
    style.transform = `translateX(${shift}%)`;
    style.transition = `transform ${props.duration}ms ease`;
  }

  return (
    <Tray {...rest} index={state.current} style={style}>
      {children}
    </Tray>
  );
};

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
  imageUrl: string;
  modalProps: string;
};

type CarouselProps = {
  items: CarouselItem[];
  itemWidth: number;
  itemHeight: number;
  animationDuration: number;
  modalGenerator: (string) => React.Node;
};

const Carousel: React.FC<CarouselProps> = (props) => {
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
          src={item.imageUrl}
          width={props.itemWidth}
          height={props.itemHeight}
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
      props.animationDuration
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
    <Container className="gz-carousel">
      <PrimaryBox>
        <BackArrow onClick={prev} />
        <Mask ref={mask}>
          <Slider
            state={state}
            length={groups.length}
            duration={props.animationDuration}
          >
            <Group width={width}>{slideChunks[slideChunks.length - 1]}</Group>
            {groups}
            <Group width={width}>{slideChunks[0]}</Group>
          </Slider>
        </Mask>
        <NextArrow onClick={next} />
      </PrimaryBox>
    </Container>
  );
};

export { CarouselProps };
export default Carousel;
