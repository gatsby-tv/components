import React, { useState, useRef, RefObject } from "react";
import {
  Play,
  Pause,
  Next,
  Playlist,
  Gear,
  Expand,
  Compress,
} from "@gatsby-tv/icons";
import { useTheme, Time } from "@gatsby-tv/utilities";

import { Box } from "@lib/components/Box";
import { TextBox } from "@lib/components/TextBox";
import { Flex } from "@lib/components/Flex";
import { Icon } from "@lib/components/Icon";
import { Button } from "@lib/components/Button";
import { Tooltip } from "@lib/components/Tooltip";

export interface ControlsProps {
  paused: boolean;
  fullscreen?: boolean;
  position: number;
  duration: number;
  nextVideo?: unknown;
  playlist?: unknown;
  togglePlayback: () => void;
  toggleFullscreen?: () => void;
}

export function Controls(props: ControlsProps): React.ReactElement {
  const theme = useTheme();
  const noop = () => null;
  const play = useRef<HTMLButtonElement>(null);

  const progress = Time(props.position * props.duration);
  const duration = Time(props.duration);

  const progressMarkup = (
    <TextBox
      as="span"
      css={`
        font-variant-numeric: tabular-nums;
      `}
      weight="semi-bold"
    >
      {`${progress} / ${duration}`}
    </TextBox>
  );

  const playMarkup = (
    <Button ref={play} onClick={props.togglePlayback}>
      <Box paddingRight={theme.spacing.tight}>
        <Icon src={props.paused ? Play : Pause} w={theme.icon.basesmall} />
      </Box>
    </Button>
  );

  const nextMarkup = props.nextVideo ? (
    <Button onClick={noop}>
      <Icon src={Next} w="17px" />
    </Button>
  ) : null;

  const playlistMarkup = props.playlist ? (
    <Button onClick={noop}>
      <Icon src={Playlist} w={theme.icon.base} />
    </Button>
  ) : null;

  const fullscreenMarkup = (
    <Button onClick={props.toggleFullscreen}>
      <Icon
        src={props.fullscreen ? Compress : Expand}
        w={theme.icon.basesmall}
      />
    </Button>
  );

  return (
    <Flex align="stretch" h="39px">
      <Flex.Item grow={1}>
        <Flex expand justify="flex-start" align="stretch">
          {playMarkup}
          {nextMarkup}
          {playlistMarkup}
          <Flex center paddingLeft={theme.spacing.tight}>
            {progressMarkup}
          </Flex>
        </Flex>
      </Flex.Item>
      <Flex.Item grow={1}>
        <Flex expand justify="flex-end" align="center">
          {fullscreenMarkup}
        </Flex>
      </Flex.Item>
    </Flex>
  );
}
