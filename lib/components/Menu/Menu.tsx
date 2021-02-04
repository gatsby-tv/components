import React, { useRef, useState } from "react";
import { css } from "styled-components";
import type { Placement } from "@popperjs/core";
import { usePopper } from "react-popper";
import { useTheme } from "@gatsby-tv/utilities";

import { Modal } from "@lib/components/Modal";
import { Connected } from "@lib/components/Connected";
import { Box } from "@lib/components/Box";
import { Size, Margin } from "@lib/types";
import { cssMargin } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";
import { cssShadow } from "@lib/styles/shadows";

import { Item, ItemProps } from "./components/Item";

export type { ItemProps as MenuItemProps };

export interface MenuProps {
  children?: React.ReactNode;
  for: React.RefObject<HTMLElement>;
  active?: boolean;
  placement?: Placement;
  offset?: [number, number];
  bg?: string;
  highlight?: string;
  w?: Size;
  padding?: Margin;
  onExit?: () => void;
}

function MenuBase(props: MenuProps): React.ReactElement {
  const theme = useTheme();

  const {
    placement = "bottom",
    offset = [0, 10],
    bg = theme.colors.background[1],
    highlight = theme.colors.background[3],
    padding = [theme.spacing[1], theme.spacing[1.5]],
  } = props;

  const [popper, setPopper] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(props.for.current, popper, {
    placement: placement,
    modifiers: [
      {
        name: "offset",
        options: {
          offset: offset,
        },
      },
      {
        name: "preventOverflow",
        options: {
          altBoundary: true,
        },
      },
      {
        name: "flip",
      },
    ],
  });

  const containerStyle = css`
    ${cssShadow}
    ${cssProperty("background-color", bg)}
    border-radius: ${(props) => props.theme.border.radius.smallest};

    ${Item} {
      cursor: pointer;
      border-radius: ${(props) => props.theme.border.radius.smallest};
      ${(props) =>
        cssMargin("padding", padding, [
          props.theme.spacing[0.5],
          props.theme.spacing[1],
        ])}
    }

    ${Item}:hover {
      ${cssProperty("background-color", highlight)}
    }
  `;

  return (
    <Modal id="menu" active={props.active} onExit={props.onExit}>
      <Box
        ref={setPopper}
        style={styles.popper}
        w={props.w}
        {...attributes.popper}
      >
        <Connected css={containerStyle} column align="stretch">
          {props.children}
        </Connected>
      </Box>
    </Modal>
  );
}

export const Menu = Object.assign(MenuBase, { Item });
