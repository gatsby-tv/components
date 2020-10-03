import styled, { css, StyledComponent, DefaultTheme } from "styled-components";

import { ifExists } from "@app/utilities";
import { Box, BoxProps } from "@app/components";
import { cssProperty } from "@app/styles";
import {
  FlexDistribute,
  FlexDirection,
  FlexWrap,
  FlexJustifyContent,
  FlexAlignItems,
  FlexAlignContent,
} from "@app/types";

import { Item, ItemProps } from "./components";

const cssDistribute = (distribute?: FlexDistribute) => {
  switch (distribute) {
    case "fill":
      return css`
        & > ${Item} {
          flex: 1 1 auto;
        }
      `;

    case "fill-evenly":
      return css`
        & > ${Item} {
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

export type { ItemProps as FlexItemProps };

export interface FlexProps extends BoxProps {
  center?: boolean;
  column?: boolean;
  distribute?: FlexDistribute;
  wrap?: FlexWrap;
  justify?: FlexJustifyContent;
  align?: FlexAlignItems;
  alignContent?: FlexAlignContent;
}

const FlexBase = styled(Box)<FlexProps>`
  display: flex;
  ${(props) => cssProperty("flex-direction", ifExists(props.column, "column"))}
  ${(props) => cssProperty("flex-wrap", props.wrap)}
  ${(props) =>
    cssProperty(
      "justify-content",
      props.justify,
      ifExists(props.center, "center")
    )}
  ${(props) =>
    cssProperty("align-items", props.align, ifExists(props.center, "center"))}
  ${(props) => cssProperty("align-content", props.alignContent)}
  ${(props) => cssDistribute(props.distribute)}
`;

export const Flex = Object.assign(FlexBase, { Item });
