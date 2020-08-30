import React from "react";
import styled from "styled-components";
import numeral from "numeral";
import moment from "moment";

import { Global } from "./styles";

/**
 * Properties to render a video thumbnail.
 *
 * @member {string} title The title of the Video.
 * @member {string} thumbnail The url to the thumbnail of the video.
 * @member {string} channelThumbnail The url to the thumbnail of the channel.
 * @member {string} channelHandle The handle of the channel that the video was uploaded to.
 * @member {number} views The number of views the video has.
 * @member {Date} uploaded The time the video was uploaded.
 */
type VideoThumbnailProps = {
  title: string,
  thumbnail: string,
  channelThumbnail: string,
  channelHandle: string,
  views: number,
  uploaded: Date
}

// Define styled components
const Root = styled(Global)`
  width: 300px;
`;

const Thumbnail = styled.img`
  width: 300px;
`;

const ChannelThumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
`;

const Details = styled.div`
  display: flex;
  gap: 10px;
  div {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

const ChannelHandle = styled.h3`
  width: fit-content;
  :hover {
    cursor: pointer;
  }
`;

const VideoThumbnail: React.FC<VideoThumbnailProps> = (props: VideoThumbnailProps) => {
  let views = numeral(props.views).format("0.0a");
  let uploaded = moment(props.uploaded).fromNow();
  return (
    <Root>
      <Thumbnail src={props.thumbnail} alt={props.title} />
      <Details>
        <ChannelThumbnail src={props.channelThumbnail} alt={props.channelHandle} />
        <div>
          {props.title}
          <ChannelHandle>{props.channelHandle}</ChannelHandle>
          <span>{views} • {uploaded}</span>
        </div>
      </Details>
    </Root>
  );
}

// Export component
export { VideoThumbnailProps };
export default VideoThumbnail;
