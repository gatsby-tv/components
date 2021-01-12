import styled, { css } from "styled-components";
import { ifExists } from "@gatsby-tv/utilities";

import { FontSize, FontStretch, FontWeight } from "@lib/types";
import { cssTextBreakWord, cssTextLineClamp } from "@lib/styles/typography";
import { cssProperty } from "@lib/styles/property";
import { Box, BoxProps } from "@lib/components/Box";

const cssFontWeight = (weight?: FontWeight) => {
  switch (weight) {
    case "semi-bold":
      return css`
        font-weight: 500;
      `;

    case "bold":
      return css`
        font-weight: 600;
      `;

    default:
      return css`
        font-weight: 400;
      `;
  }
};

export interface TextBoxProps extends BoxProps {
  spacing?: string;
  font?: FontSize;
  fontHeight?: FontSize;
  clamp?: number;
  stretch?: FontStretch;
  weight?: FontWeight;
  align?: string;
  color?: string;
}

export const TextBox = styled(Box)<TextBoxProps>`
  white-space: pre-line;
  ${(props) =>
    cssProperty("font-size", props.theme.font.size[props.font ?? "base"])}
  ${(props) =>
    cssProperty(
      "line-height",
      ifExists(
        props.fontHeight,
        props.theme.font.height[props.fontHeight as FontSize]
      ),
      props.theme.font.height[props.font ?? "base"]
    )}
  ${(props) => cssFontWeight(props.weight)}
  ${(props) => cssProperty("font-stretch", props.stretch)}
  ${(props) => ifExists(props.clamp, cssTextLineClamp(props.clamp as number))}
  ${(props) => ifExists(props.clamp, cssTextBreakWord)}
  ${(props) => cssProperty("color", props.color)}
  ${(props) => cssProperty("text-align", props.align)}

  > *:not(:first-child) {
    margin-top: ${(props) => props.spacing ?? props.theme.spacing.base};
  }
`;
