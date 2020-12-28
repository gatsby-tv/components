import React from "react";
import { useTheme } from "@gatsby-tv/utilities";

import { Activatable } from "@lib/components/Activatable";
import { TextBox } from "@lib/components/TextBox";
import { Tooltip } from "@lib/components/Tooltip";

export interface ItemTooltipProps {
  children?: string | [string];
  $for: React.RefObject<HTMLElement>;
  $active?: boolean;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = (props) => {
  const theme = useTheme();

  return (
    <Tooltip $for={props.$for} $placement="top">
      <Activatable $active={props.$active} $delay={500} $duration={200}>
        <TextBox
          $bg={theme.colors.popover}
          $spacing="none"
          $paddingTop={theme.spacing.extraTight}
          $paddingBottom={theme.spacing.extraTight}
          $paddingLeft={theme.spacing.tight}
          $paddingRight={theme.spacing.tight}
        >
          {props.children}
        </TextBox>
      </Activatable>
    </Tooltip>
  );
};
