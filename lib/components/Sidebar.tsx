import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Tooltipped from "./Tooltipped";
import { Global } from "./styles";

/**
 * A channel thumbnail on the sidebar.
 * @member {string} handle The handle of the channel.
 * @member {string} img The link to the image used for the thumbnail.
 * @member {string} link The link to navigate to when clicking the thumbnail.
 */
type ChannelProps = {
  handle: string,
  img: string,
  link: string
}

type SidebarProps = {
  /**
   * List of channels as icon hyperlinks.
   */
  channels: ChannelProps[]
}

// Define styled components
const Root = styled(Global)`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const ChannelThumbnail = styled.img`
  @keyframes expand {
    from {
      border-radius: 60px;
    }
    to {
      border-radius: 5px;
    }
  }
  :hover {
    cursor: pointer;
    animation-duration: .2s;
    animation-name: expand;
    animation-fill-mode: forwards;
  }
  border-radius: 60px;
  width: 60px;
`;

const Channel: React.FC<ChannelProps> = (props) => {
  const history = useHistory();

  return (
    <Tooltipped
      tooltipText={props.handle}>
      <ChannelThumbnail onClick={() => history.push(props.link)} alt={props.handle} src={props.img} />
    </Tooltipped>
  );
}

// Define component
const Sidebar: React.FC<SidebarProps> = (props) => {
  const channels = props.channels.map((channel, index) => (
    <Channel
      key={index}
      handle={channel.handle}
      img={channel.img}
      link={channel.link} />
  ));
  return (
    <Root>
      {channels}
    </Root>
  );
}

// Export component
export { SidebarProps };
export default Sidebar;
