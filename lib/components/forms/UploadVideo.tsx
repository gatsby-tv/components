import React from "react";
import styled from "styled-components";

import { Form } from "../styles";

type UploadVideoProps = {
  channels: string[]
}

// Define styled components
const Root = styled(Form)`
`;

// Define component
const UploadVideo: React.FC<UploadVideoProps> = (props) => {

  let channels = props.channels.map(handle => (
    <option key={handle} value={handle}>{handle}</option>
  ));
  channels.unshift(<option value="">Select a channel to upload to...</option>);

  return (
    <Root>
      <h2>Upload a video</h2>
      <input
        type="text"
        maxLength={60}
        spellCheck={true}
        placeholder="Title"
        />
      <textarea
        maxLength={1500}
        spellCheck={true}
        placeholder="Description"
        />
      <select>
        {channels}
      </select>
      <input
        type="file"
        />
    </Root>
  );
}

// Export component
export { UploadVideoProps };
export default UploadVideo;