import styled from "styled-components";

import { Box, BoxProps } from "@lib/components";

export type ShadingProps = BoxProps;

export const Shading = styled(Box)<ShadingProps>`
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.7),
    transparent 20%,
    transparent 80%,
    rgba(0, 0, 0, 0.7)
  );
`;
