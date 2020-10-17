import React from "react";
import styled, { css } from "styled-components";

import { useConnected } from "@lib/utilities";
import { Box, BoxProps } from "@lib/components";

export type ItemProps = { className?: string } & BoxProps;

const ItemBase: React.FC<ItemProps> = (props) => {
  const column = useConnected();

  const style = css`
    flex: 1 1 auto;

    &:not(:first-child) {
      ${column ? "margin-top" : "margin-left"}: -1px;
    }
  `;

  return <Box css={style} {...props} />;
};

export const Item = styled(ItemBase)``;
