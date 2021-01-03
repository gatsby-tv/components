import styled from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { Space, FontSize, FontStretch } from "@lib/types";
import {
  cssTextBody,
  cssTextBreakWord,
  cssTextLineClamp,
  cssTextTruncate,
} from "@lib/styles/typography";
import { cssProperty } from "@lib/styles/property";
import { Box, BoxProps } from "@lib/components/Box";

export interface TextBoxProps extends BoxProps {
  $spacing?: Space;
  $size?: FontSize;
  $fontHeight?: FontSize;
  $clamp?: number;
  $stretch?: FontStretch;
  $color?: string;
}

export const TextBox = styled(Box)<TextBoxProps>`
  ${cssTextBody}
  ${(props) =>
    cssProperty(
      "font-size",
      ifExists(props.$size, props.theme.font.size[props.$size as FontSize])
    )}
  ${(props) =>
    cssProperty(
      "line-height",
      ifExists(
        props.$fontHeight,
        props.theme.font.height[props.$fontHeight as FontSize]
      ),
      ifExists(props.$size, props.theme.font.height[props.$size as FontSize])
    )}
  ${(props) => cssProperty("font-stretch", props.$stretch)}
  ${(props) => ifExists(props.$clamp, cssTextTruncate)}
  ${(props) => ifExists(props.$clamp, cssTextLineClamp(props.$clamp as number))}
  ${(props) => ifExists(props.$clamp, cssTextBreakWord)}
  ${(props) => cssProperty("color", props.$color)}

  > *:not(:first-child) {
    margin-top: ${(props) => props.theme.spacing[props.$spacing ?? "base"]};
  }
`;
