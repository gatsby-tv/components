import { css, CSSProp, DefaultTheme } from "styled-components";

import { DisplaySize, MetaSize, FontSize } from "@lib/types";

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
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: ${lines};
`;

export const cssTextBody = css`
  white-space: pre-line;
  font-weight: 400;
  font-size: ${(props) => props.theme.font.size.base};
  line-height: ${(props) => props.theme.font.height.base};
`;

export const cssTextDisplay = (size: DisplaySize): CSSProp => css`
  font-size: ${(props) =>
    props.theme.font.size[size === "small" ? "displaysmall" : "displaylarge"]};
  line-height: ${(props) =>
    props.theme.font.height[
      size === "small" ? "displaysmall" : "displaylarge"
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
      fontSize = theme.font.size.metasmall;
      lineHeight = theme.font.height.metasmall;
      weight = bold ? 500 : 400;
      break;

    case "medium":
      fontSize = theme.font.size.metamedium;
      lineHeight = theme.font.height.metamedium;
      weight = bold ? 600 : 400;
      break;

    case "large":
      fontSize = theme.font.size.metalarge;
      lineHeight = theme.font.height.metalarge;
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
  color: ${(props) => props.theme.colors.error};
  font-weight: 500;
`;

export const cssTextLabel = css`
  ${cssTextCondensed}
  font-weight: 500;
`;

export const cssTextCaption = css`
  ${cssTextSemiCondensed}
  font-size: ${(props) => props.theme.font.size.small};
  line-height: ${(props) => props.theme.font.height.small};
  font-weight: 400;
`;

export const cssTextInput = css`
  white-space: pre-line;
  font-weight: 400;
  appearance: none;
`;

export const cssTextUppercase = css`
  font-weight: 600;
  appearance: none;
  text-transform: uppercase;
`;

export const cssTextTimeline = css`
  ${cssTextCondensed}
  font-size: ${(props) => props.theme.font.size.base};
  font-weight: 600;
  user-select: none;
`;

export const cssTextTab = (size?: FontSize) => css`
  ${cssTextCondensed}
  font-size: ${(props) =>
    size ? props.theme.font.size[size] : props.theme.font.size.base};
  font-weight: 600;
  text-align: center;
  user-select: none;
`;
