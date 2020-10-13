import { css } from "styled-components";

import { useTheme } from "@app/utilities";
import { DisplaySize, MetaSize } from "@app/types";

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
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const cssTextBody = css`
  font-size: ${(props) => props.theme.font.size.base};
  line-height: ${(props) => props.theme.font.height.base};
  font-weight: 400;
`;

export const cssTextDisplay = (size: DisplaySize) => css`
  font-size: ${(props) =>
    props.theme.font.size[size === "small" ? "displaySmall" : "displayLarge"]};
  line-height: ${(props) =>
    props.theme.font.height[
      size === "small" ? "displaySmall" : "displayLarge"
    ]};
  font-weight: 600;
`;

export const cssTextMeta = (size: MetaSize, bold?: boolean) => {
  const theme = useTheme();

  let fontSize: string;
  let lineHeight: string;

  switch (size) {
    case "small":
      fontSize = theme.font.size.metaSmall;
      lineHeight = theme.font.height.metaSmall;
      break;

    case "medium":
      fontSize = theme.font.size.metaMedium;
      lineHeight = theme.font.height.metaMedium;
      break;

    case "large":
      fontSize = theme.font.size.metaLarge;
      lineHeight = theme.font.height.metaLarge;
      break;
  }

  return css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    font-weight: ${bold ? 500 : 400};
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
