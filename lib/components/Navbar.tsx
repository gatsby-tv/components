import React from 'react';
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { Global } from "./styles";
import * as colors from "./colors";

// TODO: Fix type declaration with svgs
// @ts-ignore
import Logo from "../assets/logos/gatsby.svg";

type NavbarProps = {
}

// Define styled components
const Root = styled(Global)`
  width: 100%;
  padding: 10px 40px;
  display: flex;
  justify-content: left;
  align-items: center;
  img {
    width: 40px;
    margin-right: 40px;
  }
`;

const Search = styled.div`
  input, div {
    display: inline-block;
    padding: 10px 15px;
    font-size: 1em;
    -webkit-appearance: none;
    color: white;
    background-color: ${colors.backgroundHighlight};
  }
  input {
    box-sizing: border-box
    border: none;
    border: 2px solid ${colors.backgroundHighlight};
    border-radius: 5px 0px 0px 5px;
  }
  div {
    border-radius: 0px 5px 5px 0px;
    :hover {
      cursor: pointer;
    }
  }
`;

// Define component
const Navbar: React.FC<NavbarProps> = (props) => {
  const history = useHistory();
  // const items = props.items.map((item, index) => (
  //   <li key={index} onClick={() => history.push(item.link)}>{item.name}</li>
  // ));
  return (
    <Root>
      <img src={Logo} alt="Gastby" />
      <Search>
        <input
          placeholder="Search"
          type="text"
          />
        <div>Search</div>
      </Search>
    </Root>
  );
}

// Export component
export { NavbarProps };
export default Navbar;