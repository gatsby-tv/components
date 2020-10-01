import styled from "styled-components";

import { Box, BoxProps } from "@app/components";

export interface IconWrapperProps extends BoxProps {}

export const IconWrapper = styled(Box)<IconWrapperProps>`
  & > svg {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }
`;
