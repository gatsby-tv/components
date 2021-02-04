import React, { useRef, useState, useEffect, useCallback } from "react";
import { css } from "styled-components";
import {
  ifExists,
  ifNotExists,
  useTheme,
  useResizeObserver,
  useParentRef,
} from "@gatsby-tv/utilities";
import { ExtendLeft, ExtendRight } from "@gatsby-tv/icons";

import { Box } from "@lib/components/Box";
import { Flex } from "@lib/components/Flex";
import { Button } from "@lib/components/Button";
import { Icon } from "@lib/components/Icon";
import { Size } from "@lib/types";

import { Tray } from "./components/Tray";

export interface SliderProps {
  children?: React.ReactNode;
  groups: number;
  gap?: Size;
  maxw?: Size;
}

export function Slider(props: SliderProps): React.ReactElement {
  const theme = useTheme();
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [leftButton, setLeftButton] = useState(false);
  const [rightButton, setRightButton] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const parent = useParentRef<HTMLDivElement>(container);

  useResizeObserver(parent, (content) => setWidth(content.inlineSize));

  const maxIndex =
    Math.ceil(React.Children.count(props.children) / props.groups) - 1;

  const increment = useCallback(
    () => setIndex((current) => Math.min(current + 1, maxIndex)),
    [maxIndex]
  );

  const decrement = useCallback(
    () => setIndex((current) => Math.max(current - 1, 0)),
    [maxIndex]
  );

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const id = setTimeout(() => {
      setLeftButton(index !== 0);
      setRightButton(index !== maxIndex);
    }, 300);

    return () => clearTimeout(id);
  }, [index, maxIndex]);

  return (
    <Box
      ref={container}
      style={{
        width: ifExists(width && ifNotExists(props.maxw), `${width}px`),
      }}
      css={{ overflowX: "hidden" }}
      expand
      maxw={props.maxw}
    >
      <Tray
        style={{
          transform: props.gap
            ? `translateX(calc(${-100 * index}% - ${index} * ${props.gap}))`
            : `translateX(${-100 * index}%)`,
        }}
        groups={props.groups}
        gap={props.gap}
      >
        {React.Children.map(props.children, (child) => (
          <Flex.Item shrink={0}>{child}</Flex.Item>
        ))}
      </Tray>
      {leftButton && (
        <Box
          absolute
          left={theme.spacing[1]}
          top={`calc(50% - ${theme.spacing[2]})`}
        >
          <Button
            animate
            shadow
            rounded={theme.border.radius.full}
            bg={theme.colors.background[5]}
            padding={theme.spacing[1]}
            onClick={decrement}
          >
            <Icon src={ExtendLeft} w={theme.icon.base} />
          </Button>
        </Box>
      )}
      {rightButton && (
        <Box
          absolute
          right={theme.spacing[1]}
          top={`calc(50% - ${theme.spacing[2]})`}
        >
          <Button
            animate
            shadow
            rounded={theme.border.radius.full}
            bg={theme.colors.background[5]}
            padding={theme.spacing[1]}
            onClick={increment}
          >
            <Icon src={ExtendRight} w={theme.icon.base} />
          </Button>
        </Box>
      )}
    </Box>
  );
}
