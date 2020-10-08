import React from "react";

import { useTheme } from "@app/utilities";
import { Activatable, TextBox, Tooltip } from "@app/components";

export interface ItemTooltipProps {
  children?: string | [string];
  $for: React.RefObject<HTMLElement>;
  active?: boolean;
}

export const ItemTooltip: React.FC<ItemTooltipProps> = (props) => {
  const theme = useTheme();

  return (
    <Tooltip $for={props.$for} placement="top">
      <Activatable active={props.active} delay={500} duration={200}>
        <TextBox
          $spacing="none"
          paddingTop={theme.spacing.extraTight}
          paddingBottom={theme.spacing.extraTight}
          paddingLeft={theme.spacing.tight}
          paddingRight={theme.spacing.tight}
          bg={theme.colors.popover}
        >
          {props.children}
        </TextBox>
      </Activatable>
    </Tooltip>
  )
}
