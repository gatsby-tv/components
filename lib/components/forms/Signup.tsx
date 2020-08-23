import React from 'react';
import styled from "styled-components";

import { Form } from "../styles";

type SignupProps = {
}

// Define styled components
const Root = styled(Form)`
`;

// Define component
const Signup: React.FC<SignupProps> = (props) => {
  return (
    <Root>
      <h2>Join Gatsby</h2>
      <input
        type="text"
        placeholder="Email"
        />
      <input
        type="text"
        placeholder="Username"
        />
      <input
        type="password"
        placeholder="New Password"
        />
      <input
        type="password"
        placeholder="Confirm Password"
        />
    </Root>
  );
}

// Export component
export { SignupProps };
export default Signup;