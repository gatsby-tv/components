import React from "react";
import { css } from "styled-components";

import { ConnectedContext } from "@lib/utilities/connected";
import { Flex, FlexProps } from "@lib/components/Flex";

import { Item, ItemProps, Connection, ConnectionProps } from "./components";

export type { ItemProps as ConnectedItemProps };

export interface ConnectedProps {
  className?: string;
  children?: React.ReactNode;
  $left?: React.ReactNode;
  $right?: React.ReactNode;
}

function ConnectedBase(props: ConnectedProps & FlexProps) {
  const { children, $left, $right, $column, ...flexProps } = props;

  const leftMarkup = $left ? <Connection>{$left}</Connection> : null;
  const rightMarkup = $right ? <Connection>{$right}</Connection> : null;

  const style = css`
    > ${Connection}:first-child * {
      ${$column
        ? "border-bottom-left-radius"
        : "border-top-right-radius"}: 0 !important;
      border-bottom-right-radius: 0 !important;

      &:after {
        ${$column
          ? "border-bottom-left-radius"
          : "border-top-right-radius"}: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }

    > ${Connection}:last-child * {
      border-top-left-radius: 0 !important;
      ${$column
        ? "border-top-right-radius"
        : "border-bottom-left-radius"}: 0 !important;

      &:after {
        border-top-left-radius: 0 !important;
        ${$column
          ? "border-top-right-radius"
          : "border-bottom-left-radius"}: 0 !important;
      }
    }

    > ${Item}:not(:first-child) * {
      border-top-left-radius: 0 !important;
      ${$column
        ? "border-top-right-radius"
        : "border-bottom-left-radius"}: 0 !important;

      &:after {
        border-top-left-radius: 0 !important;
        ${$column
          ? "border-top-right-radius"
          : "border-bottom-left-radius"}: 0 !important;
      }
    }

    > ${Item}:not(:last-child) * {
      ${$column
        ? "border-bottom-left-radius"
        : "border-top-right-radius"}: 0 !important;
      border-bottom-right-radius: 0 !important;

      &:after {
        ${$column
          ? "border-bottom-left-radius"
          : "border-top-right-radius"}: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }
  `;

  return (
    <ConnectedContext.Provider value={$column}>
      <Flex
        className={props.className}
        css={style}
        $column={$column}
        {...flexProps}
      >
        {leftMarkup}
        {children}
        {rightMarkup}
      </Flex>
    </ConnectedContext.Provider>
  );
}

export const Connected = Object.assign(ConnectedBase, { Item });
