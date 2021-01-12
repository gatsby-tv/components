import { css } from "styled-components";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { Size, FlexDistribute } from "@lib/types";
import { parseSize } from "@lib/utilities/size";
import { supportsFlexGap } from "@lib/utilities/supports";
import { cssSize } from "@lib/styles/size";
import { cssProperty } from "@lib/styles/property";

const cssSafariFlexGapWithGroups = (
  groups: number,
  gap?: Size,
  column?: boolean
) =>
  column
    ? css`
        & > *:nth-child(${groups}) ~ * {
          ${cssSize("margin-left", gap)}
        }

        & > *:nth-child(${groups}n+1) {
          margin-top: 0;
        }
      `
    : css`
        & > *:nth-child(${groups}) ~ * {
          ${cssSize("margin-top", gap)}
        }

        & > *:nth-child(${groups}n+1) {
          margin-left: 0;
        }
      `;

const cssSafariFlexGap = (gap?: Size, column?: boolean, groups?: number) =>
  column
    ? css`
        & > *:not(:first-child) {
          ${cssSize("margin-top", gap)}
        }

        ${ifExists(
          groups,
          groups && cssSafariFlexGapWithGroups(groups, gap, column)
        ) || css``}
      `
    : css`
        & > *:not(:first-child) {
          ${cssSize("margin-left", gap)}
        }

        ${ifExists(
          groups,
          groups && cssSafariFlexGapWithGroups(groups, gap, column)
        ) || css``}
      `;

export const cssFlexGap = (
  gap?: Size,
  column?: boolean,
  groups?: number
) => css`
  ${!supportsFlexGap()
    ? cssSafariFlexGap(gap, column, groups)
    : cssSize("gap", gap)}
`;

export const cssFlexDistribute = (
  className: string,
  distribute?: FlexDistribute
) => {
  switch (distribute) {
    case "fill":
      return css`
        & > ${className} {
          flex: 1 1 auto;
        }
      `;

    case "fill-evenly":
      return css`
        & > ${className} {
          flex: 1 1 auto;

          @supports (min-width: fit-content) {
            min-width: fit-content;
            flex: 1 0 0%;
          }
        }
      `;

    default:
      return css``;
  }
};

export const cssFlexGroups = (
  className: string,
  groups?: number,
  gap?: Size
) => css`
  ${cssProperty("flex-wrap", ifExists(groups, "wrap"))}

  & > ${className} {
    ${cssProperty("flex-grow", ifExists(groups, 1))}
    ${cssProperty(
      "flex-basis",
      ifExists(
        groups,
        gap
          ? `calc(${Math.floor(100 / (groups as number))}% - ${parseSize(gap)})`
          : `${Math.floor(100 / (groups as number))}%`
      )
    )}
  }
`;
