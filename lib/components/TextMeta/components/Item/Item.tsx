import styled from "styled-components";

import { ifExists } from "@app/utilities";
import { MetaSize } from "@app/types";
import {
  cssTextMeta,
  cssTextBreakWord,
  cssTextTruncate,
  cssTextSubdued,
} from "@app/styles";

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
