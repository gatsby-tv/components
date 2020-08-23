import React from 'react';
import styled from "styled-components";

import { Form } from "../styles";

type LoginProps = {
}

// Define styled components
const Root = styled(Form)`
`;

// Define component
const Login: React.FC<LoginProps> = (props) => {
  return (
    <Root>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        />
      <input
        type="password"
        placeholder="Password"
        />
    </Root>
  );
}

// Export component
export { LoginProps };
export default Login;