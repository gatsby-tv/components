import styled from "styled-components";

import { MetaSize } from "@lib/types";
import { ifExists } from "@lib/utilities/if-exists";
import {
  cssTextMeta,
  cssTextBreakWord,
  cssTextTruncate,
  cssTextSubdued,
} from "@lib/styles/typography";

export interface ItemProps {
  size?: MetaSize;
  bold?: boolean;
  subdued?: boolean;
}

export const Item = styled.p<ItemProps>`
  ${cssTextBreakWord}
  ${cssTextTruncate}
  ${(props) => ifExists(props.subdued, cssTextSubdued)}
  ${(props) => cssTextMeta(props.size ?? "medium", props.bold)}
`;
