import React from 'react';
import styled from "styled-components";

import { Form } from "../styles";

type ForgotPasswordProps = {
}

// Define styled components
const Root = styled(Form)`
`;

// Define component
const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  return (
    <Root>
      <h2>Forgot your password?</h2>
      <p>We'll email you a temporary link to change your password.</p>
      <input
        type="text"
        placeholder="Email"
        />
    </Root>
  );
}

// Export component
export { ForgotPasswordProps };
export default ForgotPassword;