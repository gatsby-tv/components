import React, { RefObject } from "react";
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

export interface ControlsProps {
  $paused: boolean;
  $fullscreen?: boolean;
  $position: number;
  $duration: number;
  $nextVideo?: unknown;
  $playlist?: unknown;
  $togglePlayback: () => void;
  $toggleFullscreen?: () => void;
}

export function Controls(props: ControlsProps): React.ReactElement {
  const theme = useTheme();
  const noop = () => null;

  const progress = Time(props.$position * props.$duration);
  const duration = Time(props.$duration);

  const progressMarkup = (
    <TextBox
      as="span"
      css={`
        font-variant-numeric: tabular-nums;
      `}
      $weight="semi-bold"
    >
      {`${progress} / ${duration}`}
    </TextBox>
  );

  const playMarkup = (
    <Button onClick={props.$togglePlayback}>
      <Box $paddingRight={theme.spacing.tight}>
        <Icon
          $source={props.$paused ? Play : Pause}
          $width={theme.icon.baseSmall}
        />
      </Box>
    </Button>
  );

  const nextMarkup = props.$nextVideo ? (
    <Button onClick={noop}>
      <Icon $source={Next} $width="17px" />
    </Button>
  ) : null;

  const playlistMarkup = props.$playlist ? (
    <Button onClick={noop}>
      <Icon $source={Playlist} $width={theme.icon.base} />
    </Button>
  ) : null;

  const fullscreenMarkup = (
    <Button onClick={props.$toggleFullscreen}>
      <Icon
        $source={props.$fullscreen ? Compress : Expand}
        $width={theme.icon.baseSmall}
      />
    </Button>
  );

  return (
    <Flex $align="stretch" $height="39px">
      <Flex.Item $grow={1}>
        <Flex $fill $justify="flex-start" $align="stretch">
          {playMarkup}
          {nextMarkup}
          {playlistMarkup}
          <Flex $center $paddingLeft={theme.spacing.tight}>
            {progressMarkup}
          </Flex>
        </Flex>
      </Flex.Item>
      <Flex.Item $grow={1}>
        <Flex $fill $justify="flex-end" $align="center">
          {fullscreenMarkup}
        </Flex>
      </Flex.Item>
    </Flex>
  );
}
