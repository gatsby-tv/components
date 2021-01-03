import styled from "styled-components";
import { ifExists, ifNotExists } from "@gatsby-tv/utilities";

import { MetaSize } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import {
  cssTextMeta,
  cssTextBreakWord,
  cssTextLineClamp,
  cssTextTruncate,
  cssTextSubdued,
} from "@lib/styles/typography";

export interface ItemProps {
  $size?: MetaSize;
  $clamp?: number;
  $bold?: boolean;
  $subdued?: boolean;
}

export const Item = styled.span<ItemProps>`
  ${cssTextBreakWord}
  ${cssTextTruncate}
  ${(props) => cssProperty("white-space", ifNotExists(props.$clamp, "nowrap"))}
  ${(props) => ifExists(props.$clamp, cssTextLineClamp(props.$clamp as number))}
  ${(props) => ifExists(props.$subdued, cssTextSubdued)}
  ${(props) => cssTextMeta(props.theme, props.$size ?? "medium", props.$bold)}
`;
