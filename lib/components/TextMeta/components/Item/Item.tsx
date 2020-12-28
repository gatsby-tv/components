import styled from "styled-components";

import { MetaSize } from "@lib/types";
import { ifExists, ifNotExists } from "@lib/utilities/if-exists";
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

export const Item = styled.p<ItemProps>`
  ${cssTextBreakWord}
  ${cssTextTruncate}
  ${(props) => cssProperty("white-space", ifNotExists(props.$clamp, "nowrap"))}
  ${(props) => ifExists(props.$clamp, cssTextLineClamp(props.$clamp as number))}
  ${(props) => ifExists(props.$subdued, cssTextSubdued)}
  ${(props) => cssTextMeta(props.$size ?? "medium", props.$bold)}
`;
