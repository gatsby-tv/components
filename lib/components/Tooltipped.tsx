import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import { Global } from "./styles";

type TooltippedProps = {
  tooltipText: string,
  children: React.ReactNode
}

// Define styled components
const Root = styled(Global)`
  position: relative;
`;

const Component = styled(Global)`
`;

const Tooltip = styled(Global)`
  position: absolute;
  z-index: 999;
  left: 130%;
  padding: 10px;
  border-radius: 5px;
  top: 0;
`;

/**
 * Adds a tooltip to the children of this component when hovered on.
 *
 * @param {TooltippedProps} props The content of the tooltip.
 */
const Tooltipped: React.FC<TooltippedProps> = (props: TooltippedProps) => {
  const [tooltipShown, toggleTooltip] = useState(false);

  return (
    <Root>
      <Component
        onMouseEnter={() => toggleTooltip(true)}
        onMouseLeave={() => toggleTooltip(false)}>
        {props.children}
      </Component>
      {tooltipShown && (
        <Tooltip>{props.tooltipText}</Tooltip>
      )}
    </Root>
  );
}

// Export component
export { TooltippedProps };
export default Tooltipped;
