import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "@gatsby-tv/utilities";

import { Flex } from "@lib/components/Flex";
import { Size, Margin } from "@lib/types";
import { cssProperty } from "@lib/styles/property";
import { cssSize, cssMargin } from "@lib/styles/size";
import { cssTextUppercase } from "@lib/styles/typography";

export interface RuleProps {
  children?: string | string[];
  font?: string;
  bg?: string;
  fg?: string;
  w?: Size;
  margin?: Margin;
  thin?: boolean;
}

const RuleBase = styled.hr<Omit<RuleProps, "font" | "fg" | "children">>`
  border: none;
  height: ${(props) => (props.thin ? "1px" : "2px")};
  background-color: ${(props) => props.bg ?? props.theme.colors.background[3]};
  ${(props) => cssSize("width", props.w)}
  ${(props) => cssMargin("margin", props.margin)}
`;

export function Rule(props: RuleProps): React.ReactElement {
  const theme = useTheme();

  const text = css`
    ${cssTextUppercase}
    ${cssProperty("font-size", props.font)}
    color: ${props.fg ?? theme.colors.font.subdued};
    text-align: center;
    vertical-align: middle;
    outline: none;
  `;

  if (props.children) {
    return (
      <Flex css={text} w={props.w ?? 1} margin={props.margin} align="center">
        <RuleBase
          w={1}
          bg={props.bg}
          thin={props.thin}
          margin={[
            theme.spacing[0],
            theme.spacing[1],
            theme.spacing[0],
            theme.spacing[0],
          ]}
        />
        {props.children}
        <RuleBase
          w={1}
          thin={props.thin}
          bg={props.bg}
          margin={[
            theme.spacing[0],
            theme.spacing[0],
            theme.spacing[0],
            theme.spacing[1],
          ]}
        />
      </Flex>
    );
  } else {
    return <RuleBase {...props} />;
  }
}
