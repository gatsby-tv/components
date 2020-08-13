import React from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";

// Define types
type Item = {
  name: string,
  link: string
}

type SidebarProps = {
  items: Item[]
}

// Define styled components
const Root = styled.div`
  background-color: gray;
  width: fit-content;
  padding: 10px;
  a {
    text-decoration: none;
    color: white;
  }
`;

const List = styled.ul`
  list-style: none;
`;

// Define component
const Sidebar: React.FC<SidebarProps> = (props) => {
  const items = props.items.map((item, index) => (
    <li key={index}><Link to={item.link}>{item.name}</Link></li>
  ));
  return (
    <Root>
      <BrowserRouter>
        <List>
          {items}
        </List>
      </BrowserRouter>
    </Root>
  );
}

// Export component
export default Sidebar;
