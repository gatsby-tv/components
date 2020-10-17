import React from "react";
import styled, { css } from "styled-components";

import { useConnected } from "@app/utilities";
import { Box, BoxProps } from "@app/components";

export type ConnectionProps = { className?: string } & BoxProps;

const ConnectionBase: React.FC<ConnectionProps> = (props) => {
  const column = useConnected();

  const style = css`
    flex: 0 0 auto;

    &:not(:first-child) {
      ${column ? "margin-top" : "margin-left"}: -1px;
    }
  `;

  return <Box css={style} {...props} />;
};

export const Connection = styled(ConnectionBase)``;
