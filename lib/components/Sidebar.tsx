import React from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Global } from "./styles";
import * as colors from "./colors";
/**
 * A link on a Sidebar component.
 * @member {string} label The label to render for the link.
 * @member {string} link The link to navigate to when clicking the label.
 */
type Item = {
  label: string,
  link: string
}

type SidebarProps = {
  /**
   * List of links to include in the sidebar.
   */
  items: Item[]
}

// Define styled components
const Root = styled(Global)`
  width: fit-content;
  padding: 20px 0px 20px 0px;
`;

const Items = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  text-decoration: none;
  color: white;
  :hover {
    cursor: pointer;
    background-color: ${colors.backgroundHighlight};
  }
  padding: 10px 40px 10px 40px;
`;

// Define component
const Sidebar: React.FC<SidebarProps> = (props) => {
  const history = useHistory();
  const items = props.items.map((item, index) => (
    <Item key={index} onClick={() => history.push(item.link)}>{item.label}</Item>
  ));
  return (
    <Root>
      <Items>
        {items}
      </Items>
    </Root>
  );
}

// Export component
export { SidebarProps };
export default Sidebar;
