import React from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import styled from "styled-components";

// Define types
type Item = {
  name: string,
  link: string
}

type NavbarProps = {
  items: Item[]
}

// Define styled components
const Root = styled.div`
  background-color: goldenrod;
  width: 100%;
  padding: 10px;
  a {
    text-decoration: none;
    color: white;
  }
  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  li {
    display: inline-block;
  }
`;

// Define component
const Navbar: React.FC<NavbarProps> = (props) => {
  const items = props.items.map((item, index) => (
    <li key={index}><Link to={item.link}>{item.name}</Link></li>
  ));
  return (
    <Root>
      <BrowserRouter>
        <ul>
          {items}
        </ul>
      </BrowserRouter>
    </Root>
  );
}

// Export component
export default Navbar;