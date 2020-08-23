import React from 'react';
import styled from "styled-components";

import { Form } from "../styles";

type ChangePasswordProps = {
}

// Define styled components
const Root = styled(Form)`
`;

// Define component
const ChangePassword: React.FC<ChangePasswordProps> = (props) => {
  return (
    <Root>
      <h2>Change your password</h2>
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
export { ChangePasswordProps };
export default ChangePassword;