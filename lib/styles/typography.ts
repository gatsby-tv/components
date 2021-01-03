import { css, CSSProp, DefaultTheme } from "styled-components";

import { DisplaySize, MetaSize } from "@lib/types";

export const cssTextSubdued = css`
  color: ${(props) => props.theme.colors.font.subdued};
`;

export const cssTextCondensed = css`
  font-stretch: condensed;
`;

export const cssTextSemiCondensed = css`
  font-stretch: semi-condensed;
`;

export const cssTextBreakWord = css`
  word-wrap: break-word;
  word-break: break-word;
  overflow-wrap: break-word;
`;

export const cssTextTruncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const cssTextLineClamp = (lines: number): CSSProp => css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
`;

export const cssTextBody = css`
  white-space: pre-line;
  font-size: ${(props) => props.theme.font.size.base};
  line-height: ${(props) => props.theme.font.height.base};
  font-weight: 400;
`;

export const cssTextDisplay = (size: DisplaySize): CSSProp => css`
  font-size: ${(props) =>
    props.theme.font.size[size === "small" ? "displaySmall" : "displayLarge"]};
  line-height: ${(props) =>
    props.theme.font.height[
      size === "small" ? "displaySmall" : "displayLarge"
    ]};
  font-weight: 700;
`;

export const cssTextMeta = (
  theme: DefaultTheme,
  size: MetaSize,
  bold?: boolean
): CSSProp => {
  let fontSize: string;
  let lineHeight: string;
  let weight: number;

  switch (size) {
    case "small":
      fontSize = theme.font.size.metaSmall;
      lineHeight = theme.font.height.metaSmall;
      weight = bold ? 500 : 400;
      break;

    case "medium":
      fontSize = theme.font.size.metaMedium;
      lineHeight = theme.font.height.metaMedium;
      weight = bold ? 600 : 400;
      break;

    case "large":
      fontSize = theme.font.size.metaLarge;
      lineHeight = theme.font.height.metaLarge;
      weight = bold ? 600 : 400;
      break;
  }

  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    font-weight: ${weight};
  `;
};

export const cssTextHeading = css`
  font-size: ${(props) => props.theme.font.size.heading};
  line-height: ${(props) => props.theme.font.height.heading};
  font-weight: 600;
`;

export const cssTextSubheading = css`
  font-size: ${(props) => props.theme.font.size.subheading};
  line-height: ${(props) => props.theme.font.height.subheading};
  font-weight: 600;
  text-transform: uppercase;
`;

export const cssTextError = css`
  font-size: ${(props) => props.theme.font.size.base};
  line-height: ${(props) => props.theme.font.height.base};
  color: ${(props) => props.theme.colors.error};
  font-weight: 500;
`;

export const cssTextLabel = css`
  ${cssTextCondensed}
  font-size: ${(props) => props.theme.font.size.base};
  line-height: ${(props) => props.theme.font.height.base};
  font-weight: 400;
`;

export const cssTextCaption = css`
  ${cssTextSemiCondensed}
  font-size: ${(props) => props.theme.font.size.small};
  line-height: ${(props) => props.theme.font.height.small};
  font-weight: 400;
`;

export const cssTextInput = css`
  ${cssTextBody}
  color: ${(props) => props.theme.colors.font.body.darken(0.1)};
  appearance: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.font.body.fade(0.5)};
  }
`;

export const cssTextButton = css`
  font-size: ${(props) => props.theme.font.size.baseSmall};
  line-height: ${(props) => props.theme.font.height.base};
  font-weight: 600;
  color: ${(props) => props.theme.colors.font.body.darken(0.1)};
  appearance: none;
  text-transform: uppercase;
`;

export const cssTextTimeline = css`
  ${cssTextCondensed}
  font-size: ${(props) => props.theme.font.size.base};
  font-weight: 600;
  user-select: none;
`;
