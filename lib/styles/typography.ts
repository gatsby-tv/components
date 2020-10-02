import { css } from "styled-components";

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

export const cssTextLabel = css`
  ${cssTextCondensed}
  font-size: ${(props) => props.theme.font.size.base};
  line-height: ${(props) => props.theme.font.height.base};
  font-weight: 400;
`;

export const cssTextInput = css`
  ${cssTextBody}
  color: ${(props) => props.theme.colors.font.inverted};
  appearance: none;
`;
